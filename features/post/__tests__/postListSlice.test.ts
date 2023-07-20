import { postModel } from "../../../models/postModel";
import type { RootState } from "../../../store";
import reducer, {
  matchCurrentPostList,
  selectCurrentPost,
  selectPostList,
  updateCurrentPost,
  updateCurrentPostLikes,
  updatePostList,
} from "../postListSlice";

describe("test cases for postListSlice redux", () => {
  const initialStateNew = {
    postList: [],
    currentPost: undefined,
  };

  const newPost: postModel = {
    id: "1234",
    caption: "hello there",
    post_thumbnail_url: "thumbnail",
    post_video_url: "video",
    created_at: new Date(Date.parse("2023-07-18T18:24:02.443Z")),
    updated_at: new Date(Date.parse("2023-07-18T18:24:02.443Z")),
    profile_id: "1234",
    gym_id: "1234",
    is_private: true,
    selected_grade: "v2",
    likes: 0,
  };

  const newPost2: postModel = {
    id: "1234",
    caption: "hello there",
    post_thumbnail_url: "thumbnail",
    post_video_url: "video",
    created_at: new Date(Date.parse("2023-07-18T18:24:02.443Z")),
    updated_at: new Date(Date.parse("2023-07-18T18:24:02.443Z")),
    profile_id: "1234",
    gym_id: "1234",
    is_private: true,
    selected_grade: "v2",
    likes: 1,
  };

  it("returns initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialStateNew);
  });

  it("able to update the postList", () => {
    expect(reducer(initialStateNew, updatePostList([newPost]))).toEqual({
      postList: [newPost],
      currentPost: undefined,
    });
  });

  it("able to update the currentPost", () => {
    expect(reducer(initialStateNew, updateCurrentPost(newPost))).toEqual({
      postList: [],
      currentPost: newPost,
    });
  });

  it("able to matchCurrentPost", () => {
    let postList = reducer(initialStateNew, updatePostList([newPost]));
    expect(postList).toEqual({
      postList: [newPost],
      currentPost: undefined,
    });
    postList = reducer(postList, updateCurrentPost(newPost2));
    expect(postList).toEqual({
      postList: [newPost],
      currentPost: newPost2,
    });

    postList = reducer(postList, matchCurrentPostList());
    expect(postList).toEqual({
      postList: [newPost2],
      currentPost: newPost2,
    });
  });

  it("should not match if undefined", () => {
    let postList = reducer(initialStateNew, matchCurrentPostList());
    expect(postList).toEqual({
      postList: [],
      currentPost: undefined,
    });
  });

  it("should not do anything when post_id not defined", () => {
    const newPost3: postModel = {
      id: undefined,
      caption: "hello there",
      post_thumbnail_url: "thumbnail",
      post_video_url: "video",
      created_at: new Date(Date.parse("2023-07-18T18:24:02.443Z")),
      updated_at: new Date(Date.parse("2023-07-18T18:24:02.443Z")),
      profile_id: "1234",
      gym_id: "1234",
      is_private: true,
      selected_grade: "v2",
      likes: 0,
    };
    const newPost4: postModel = {
      id: undefined,
      caption: "hello there",
      post_thumbnail_url: "thumbnail",
      post_video_url: "video",
      created_at: new Date(Date.parse("2023-07-18T18:24:02.443Z")),
      updated_at: new Date(Date.parse("2023-07-18T18:24:02.443Z")),
      profile_id: "1234",
      gym_id: "1234",
      is_private: true,
      selected_grade: "v2",
      likes: 1,
    };
    let postList = reducer(initialStateNew, updateCurrentPost(newPost4));
    expect(postList).toEqual({
      postList: [],
      currentPost: newPost4,
    });

    postList = reducer(postList, updatePostList([newPost3]));
    expect(postList).toEqual({
      postList: [newPost3],
      currentPost: newPost4,
    });

    postList = reducer(postList, matchCurrentPostList());
    expect(postList).toEqual({
      postList: [newPost3],
      currentPost: newPost4,
    });
  });

  it("able to updateCurrentPostLikes", () => {
    let postList = reducer(initialStateNew, updateCurrentPost(newPost));
    expect(postList).toEqual({
      postList: [],
      currentPost: newPost,
    });
    postList = reducer(postList, updateCurrentPostLikes(1));
    expect(postList).toEqual({
      postList: [],
      currentPost: newPost2,
    });
  });

  it("should not update likes if not defined", () => {
    let postList = reducer(initialStateNew, updateCurrentPostLikes(1));
    expect(postList).toEqual({
      postList: [],
      currentPost: undefined,
    });
  });

  it("able to selectCurrentPost", () => {
    let postList = reducer(initialStateNew, updateCurrentPost(newPost));
    expect(postList).toEqual({
      postList: [],
      currentPost: newPost,
    });

    expect(selectCurrentPost({ postList } as RootState)).toEqual(newPost);
  });

  it("able to selectPostList", () => {
    let postList = reducer(initialStateNew, updatePostList([newPost]));
    expect(postList).toEqual({
      postList: [newPost],
      currentPost: undefined,
    });
    expect(selectPostList({ postList } as RootState)).toEqual([newPost]);
  });
});
