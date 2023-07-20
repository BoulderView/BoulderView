import type { RootState } from "../../../store";
import reducer, {
  selectGymImage,
  selectGymImageWithName,
  updateGymImage,
} from "../gymImageSlice";

describe("test cases for gymImageSlice redux", () => {
  const initialStateNew = {
    gymImage: {},
  };

  interface gymImageObject {
    key: string;
    value: string;
  }

  const gymImageObject: gymImageObject = {
    key: "key1",
    value: "sample_url",
  };

  it("Have no initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialStateNew);
  });

  it("Able to correctly update the gymImage object", () => {
    expect(reducer(initialStateNew, updateGymImage(gymImageObject))).toEqual({
      gymImage: {
        key1: "sample_url",
      },
    });
  });

  it("does not update if already added", () => {
    const gymImageObject2: gymImageObject = {
      key: "key1",
      value: "sample_url_2",
    };
    const newState = reducer(initialStateNew, updateGymImage(gymImageObject));
    expect(newState).toEqual({
      gymImage: {
        key1: "sample_url",
      },
    });
    expect(reducer(newState, updateGymImage(gymImageObject2))).toEqual({
      gymImage: {
        key1: "sample_url",
      },
    });
  });

  it("able to select gym image", () => {
    const gymImage = reducer(initialStateNew, updateGymImage(gymImageObject));
    expect(gymImage).toEqual({
      gymImage: {
        key1: "sample_url",
      },
    });

    expect(selectGymImage({ gymImage } as RootState)).toEqual({
      key1: "sample_url",
    });
  });

  it("able to select gym image with name", () => {
    const gymImage = reducer(initialStateNew, updateGymImage(gymImageObject));
    expect(gymImage).toEqual({
      gymImage: {
        key1: "sample_url",
      },
    });

    expect(selectGymImageWithName({ gymImage } as RootState, "key1")).toEqual(
      "sample_url"
    );
  });
});
