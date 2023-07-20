import reducer, { updateGymList, selectGymList } from "../gymListSlice";
import type { RootState } from "../../../store";
import { gymModel } from "../../../models/gymModel";

describe("test cases for gymListSlice redux", () => {
  const initialStateNew = {
    gymList: [],
  };

  const newGymList: gymModel[] = [
    {
      id: "1234",
      name: "name",
      cover_image_url: "image",
      description: "hello there",
      gym_grade: ["v3"],
      latitude: 0.0,
      longitude: 0.0,
      address: "singapore",
    },
  ];

  it("returns initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialStateNew);
  });

  it("able to update the gymList", () => {
    expect(reducer(initialStateNew, updateGymList(newGymList))).toEqual({
      gymList: newGymList,
    });
  });

  it("able to use the selector", () => {
    const gymList = reducer(initialStateNew, updateGymList(newGymList));
    expect(gymList).toEqual({
      gymList: newGymList,
    });

    expect(selectGymList({ gymList } as RootState)).toEqual(
      newGymList,
    );
  });
});
