import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';

import { supabase } from '../../lib/supabase';
import { postModel } from '../../models/postModel';
import PostOverviewComponent from '../postComponents/PostOverviewComponent';

interface Props {
    profileId: string | string[] | undefined;
    postData?: postModel[]
}

const HistoryComponent = () => {
    const [postData, setPostData] = useState<postModel[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser()

                let { data, error, status } = await supabase
                    .from('post')
                    .select()
                    .eq('profile_id', user?.id);

                // If there is any form of error
                if (error || status !== 200) {
                    throw error;
                }

                if (data) {
                    // Casting data to gymModel
                    const updatedData = data as postModel[];
                    setPostData(updatedData);
                }

            } catch (error: any) {
                Alert.alert(error.message);
            }
        };

        fetchData();
    }, []);
    return (
        <View>
            <FlatList data={postData} numColumns={2} keyExtractor={(item) => item.id as string} renderItem={({ item }) =>
                <PostOverviewComponent
                    videoUrl={item.post_video_url}
                    thumbnailUrl={item.post_thumbnail_url}
                    caption={item.caption}
                    profileId={item.profile_id}
                    likes={item.likes}
                    selectedGrade={item.selected_grade}
                    createdAt={item.created_at}
                />}
            />
        </View >
    )
}

export default HistoryComponent;
