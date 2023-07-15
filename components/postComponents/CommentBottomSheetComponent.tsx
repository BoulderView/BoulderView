import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Alert, ListRenderItem } from "react-native";
import { Portal, PortalHost } from "@gorhom/portal";
import CommentCardComponent from "./CommentCardComponent";
import { supabase } from "../../lib/supabase";
import { commentModel } from "../../models/commentModel";
import CommentInputComponent from "./CommentInputComponent";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useSelector, useDispatch } from "react-redux";
import { selectCommentList, updateCommentList } from "../../features/comment/commentListSlice";

interface Props {
  setIsCommentsOpen: (value: boolean) => void;
  postId: string | undefined;
}

const CommentBottomSheetComponent: React.FC<Props> = ({
  setIsCommentsOpen,
  postId,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [updatedCommentList, setUpdatedCommentList] = useState(true);

  const dispatch = useDispatch();
  const commentList = useSelector(selectCommentList);

  const snapPoints = ["80%"];

  const fetchComments = async () => {
    try {
      let { data, error, status } = await supabase
        .from("comments")
        .select()
        .eq("post_id", postId);

      // If there is any form of error
      if (error || status !== 200) {
        throw error;
      }

      if (data) {
        // Casting data to gymModel
        const comments = data as commentModel[];
        dispatch(updateCommentList(comments));
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setIsLoading(false);
      setUpdatedCommentList(false);
    }
  };

  useEffect(() => {
    if (!isLoading && updatedCommentList) {
      setIsLoading(true);
      fetchComments();
    }
  }, [updatedCommentList]);

  const handleEmpty = () => {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Start a conversation!</Text>
      </View>
    );
  };

  const renderItem: ListRenderItem<commentModel> = ({ item }) => {
    return <CommentCardComponent comment={item} />;
  };

  return (
    <>
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setIsCommentsOpen(false)}
        >
          <BottomSheetView style={styles.commentContainer}>
            <View style={styles.titleContainer}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Comments</Text>
            </View>
            <View style={styles.listContainer}>
            <BottomSheetFlatList
              data={commentList}
              ListEmptyComponent={handleEmpty}
              renderItem={renderItem}
              onRefresh={fetchComments}
              refreshing={false}
              style={styles.listContainer}
            />
            </View>
            <View style={styles.commentInputContainer}>
              <CommentInputComponent
                postId={postId}
                setUpdatedCommentList={setUpdatedCommentList}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
      <PortalHost name="comment_bottom_sheet_portal" />
    </>
  );
};

export default CommentBottomSheetComponent;

const styles = StyleSheet.create({
  titleContainer: {
    borderBottomWidth: 0.5,
    color: "grey",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height:"8%"
  },
  commentContainer: {
    height: "100%",
    justifyContent: "space-between",
  },
  listContainer: {
    height:"80%"
  },
  commentInputContainer: {
    height:"12%",
    paddingBottom:10
  }
});
