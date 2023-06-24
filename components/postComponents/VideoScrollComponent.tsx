import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { postModel } from '../../models/postModel';
import VideoComponent from './VideoComponent';

interface Props {
  video_url:string,
  postList:postModel[] | undefined
}

const VideoScrollComponent:React.FC<Props> = ({ video_url, postList }) => {

  const supabaseUrl = process.env.SUPABASE_PROJECT_URL;

  const postRef = useRef(null);

  const [startingIndex, setStartingIndex] = useState<number>(1);

  useEffect(() => {
    const index = postList?.findIndex((post) => post.post_video_url === video_url);
    if (index) {
      setStartingIndex(index);
    }
  })

  return (
    <>
      <FlatList 
        ref={postRef}
        data={postList}
        keyExtractor={(item) => item.id as string} // have to fix in the future
        renderItem={
          ({item}) => <VideoComponent 
            videoLink={`${supabaseUrl}/storage/v1/object/public/postVideos/${item.post_video_url}`}
          />
        }
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").height}
        initialScrollIndex={startingIndex}
      />
    </>
  )
}

export default VideoScrollComponent;
