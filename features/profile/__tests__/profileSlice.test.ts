import type { Session } from "@supabase/supabase-js";
import { profileModel } from "../../../models/profileModel";
import type { RootState } from "../../../store";
import reducer, {
  updateProfile,
  updateAvatar,
  updateCommentArray,
  updateLike,
  updateSession,
  selectAvatar,
  selectProfile,
  selectSession,
} from "../profileSlice";
import { select } from "d3";

describe("test cases for postListSlice redux", () => {
  interface ProfileState {
    session: Session | null;
    profile: profileModel | null;
    avatar: string | null;
  }
  
  // Define the initial state using that type
  const initialState: ProfileState = {
    session: null,
    profile: null,
    avatar: null,
  };

  const newProfile:profileModel = {
    id: "1234",
    username: "user",
    full_name: "user_full",
    description: "desc",
    avatar_url: "url",
    updated_at: new Date(Date.parse("2023-07-18T18:24:02.443Z")),
    liked_comment_id: ["1234"],
    liked_post_id: ["1234"]
  }

  it("can update profile, avatar", () => {
    let profile = reducer(initialState, updateProfile(newProfile))
    expect(profile).toEqual({
      session: null,
      profile: newProfile,
      avatar: null
    })

    profile = reducer(profile, updateAvatar("url"))
    expect(profile).toEqual({
      session: null,
      profile: newProfile,
      avatar: "url"
    })

    // No session for now
    profile = reducer(profile, updateSession(null))
    expect(profile).toEqual({
      session: null,
      profile: newProfile,
      avatar: "url"
    })
  })

  it("can update commentArray", () => {
    const newProfile2:profileModel = {
      id: "1234",
      username: "user",
      full_name: "user_full",
      description: "desc",
      avatar_url: "url",
      updated_at: new Date(Date.parse("2023-07-18T18:24:02.443Z")),
      liked_comment_id: ["12345"],
      liked_post_id: ["1234"]
    }

    let profile = reducer(initialState, updateProfile(newProfile))
    expect(profile).toEqual({
      session: null,
      profile: newProfile,
      avatar: null
    })

    profile = reducer(profile, updateCommentArray(["12345"]))
    expect(profile).toEqual({
      session: null,
      profile: newProfile2,
      avatar: null
    })
  })

  it("can update post like array", () => {
    const newProfile2:profileModel = {
      id: "1234",
      username: "user",
      full_name: "user_full",
      description: "desc",
      avatar_url: "url",
      updated_at: new Date(Date.parse("2023-07-18T18:24:02.443Z")),
      liked_comment_id: ["1234"],
      liked_post_id: ["12345"]
    }

    let profile = reducer(initialState, updateProfile(newProfile))
    expect(profile).toEqual({
      session: null,
      profile: newProfile,
      avatar: null
    })

    profile = reducer(profile, updateLike(["12345"]))
    expect(profile).toEqual({
      session: null,
      profile: newProfile2,
      avatar: null
    })
  })

  it("should not update if profile is null", () => {
    let profile = reducer(initialState, updateCommentArray(["1234"]))
    expect(profile).toEqual({
      session: null,
      profile: null,
      avatar: null
    })

    profile = reducer(initialState, updateLike(["1234"]))
    expect(profile).toEqual({
      session: null,
      profile: null,
      avatar: null
    })
  })

  it("able to use selectors", () => {
    let profile = reducer(initialState, updateProfile(newProfile))
    expect(profile).toEqual({
      session: null,
      profile: newProfile,
      avatar: null
    })

    profile = reducer(profile, updateAvatar("url"))
    expect(profile).toEqual({
      session: null,
      profile: newProfile,
      avatar: "url"
    })

    expect(selectProfile({profile} as RootState)).toEqual(newProfile)
    expect(selectAvatar({profile} as RootState)).toEqual("url")
    expect(selectSession({profile} as RootState)).toEqual(null)
  })
});
