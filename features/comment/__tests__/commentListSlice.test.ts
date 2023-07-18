import reducer, {
  updateCommentList,
  updateCurrentComment,
  matchCommentLikes,
  initialState,
  selectCommentList,
  selectCurrentComment,
} from "../commentListSlice";
import { commentModel } from "../../../models/commentModel";
import type { RootState } from "../../../store";

describe("test cases for commentListSlice reducer", () => {
  const newCommentList: commentModel[] = [
    {
      id: "1234",
      created_at: new Date(),
      comment: "hello",
      post_id: "1234",
      profile_id: "1234",
      likes: 0,
      commenter_username: "user",
    },
  ];

  const newCurrentComment: commentModel = {
    id: "1234",
    created_at: new Date(),
    comment: "hello",
    post_id: "1234",
    profile_id: "1234",
    likes: 0,
    commenter_username: "user",
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      commentList: undefined,
      currentComment: undefined,
    });
  });

  it("updateCommentList for empty state", () => {
    expect(reducer(initialState, updateCommentList(newCommentList))).toEqual({
      commentList: newCommentList,
      currentComment: undefined,
    });
  });

  it("update current comment with empty state", () => {
    expect(
      reducer(initialState, updateCurrentComment(newCurrentComment))
    ).toEqual({
      commentList: undefined,
      currentComment: newCurrentComment,
    });
  });

  it("should not match comments when currentComment is empty", () => {
    const previousState = {
      commentList: newCommentList,
      currentComment: undefined,
    };

    expect(reducer(previousState, matchCommentLikes())).toEqual(previousState);
  });

  it("should not match comments when commentList is empty", () => {
    const previousState = {
      commentList: undefined,
      currentComment: newCurrentComment,
    };

    expect(reducer(previousState, matchCommentLikes())).toEqual(previousState);
  });
});

describe("test cases for commentListSlice Selectors", () => {
  const commentList = initialState;

  const newCurrentComment: commentModel = {
    id: "1234",
    created_at: new Date(Date.parse("2023-07-18T18:24:02.443Z")),
    comment: "hello",
    post_id: "1234",
    profile_id: "1234",
    likes: 0,
    commenter_username: "user",
  };

  it("Getting initial commentList", () => {
    const result = selectCommentList({ commentList } as RootState);
    expect(result).toEqual(undefined);
  });

  it("Getting initial currentComment", () => {
    const result = selectCurrentComment({ commentList } as RootState);
    expect(result).toEqual(undefined);
  });

  it("Testing matchCommentLikes with commentList selector", () => {
    let commentList = initialState

    const commentList1 = [{
      id: "1234",
      created_at: new Date(Date.parse("2023-07-18T18:24:02.443Z")),
      comment: "hello",
      post_id: "1234",
      profile_id: "1234",
      likes: 0,
      commenter_username: "user",
    }]

    const comment = {
      id: "1234",
      created_at: new Date(Date.parse("2023-07-18T18:24:02.443Z")),
      comment: "hello",
      post_id: "1234",
      profile_id: "1234",
      likes: 1,
      commenter_username: "user",
    }

    commentList = reducer(commentList, updateCommentList(commentList1));
    commentList = reducer(commentList, updateCurrentComment(comment));
    commentList = reducer(commentList, matchCommentLikes());
    const result = selectCommentList({commentList} as RootState);
    expect(result).toEqual([comment])
  });
});
