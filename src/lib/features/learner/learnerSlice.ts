import { del, get, post, put } from "@/api/base";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LearnerState {
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
  isLoader: boolean;
  isdelLoader: boolean;
  learnerData: any;
  SingleLearner: any;
}

const initialState: LearnerState = {
  loading: "idle",
  error: null,
  isLoader: false,
  isdelLoader: false,
  learnerData: [],
  SingleLearner: null,
};

export const createLearner = createAsyncThunk(
  "createLearner",
  async (body: any) => {
    try {
      const response = await post("learners", body);
      return response;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const createLearnerCourse = createAsyncThunk(
  "createLearnerCourse",
  async (body: any) => {
    try {
      const response = await post("learners/courses", body);
      return response;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const createBatchTopic = createAsyncThunk(
  "createBatchTopic",
  async (body: any) => {
    console.log("🚀 ~ body:", body);
    try {
      const response = await post(
        `batch-topics/upsert${body?.id ? `?batchId=${body?.id}` : ""}`,
        body?.data
      );
      return response;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const getLearner = createAsyncThunk("getLearner", async () => {
  try {
    const response = await get(`learners`);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
});

export const updateLearner = createAsyncThunk(
  "updateLearner",
  async (data: any) => {
    try {
      const response = await put(`learners/${data?.id}`, data?.data);
      return response;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const deleteLearnerData = createAsyncThunk(
  "/deleteLearnerData",
  async (ids: any) => {
    try {
      const response = await del(`learners?ids=${ids}`);
      return response;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const getSingleLearner = createAsyncThunk(
  "getSingleLearner",
  async (id: number) => {
    try {
      const response = await get(`learners/${id}`);
      return response;
    } catch (error: any) {
      // If an error occurs, return the error response data
      throw new Error(error.response.data);
    }
  }
);

const learnerSlice = createSlice({
  name: "learners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLearner.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createLearner.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.error = null;
      })
      .addCase(createLearner.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload as string;
      })
      .addCase(createLearnerCourse.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createLearnerCourse.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.error = null;
      })
      .addCase(createLearnerCourse.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload as string;
      })
      .addCase(deleteLearnerData.pending, (state) => {
        state.isdelLoader = true;
        state.loading = "pending";
      })
      .addCase(deleteLearnerData.fulfilled, (state, action) => {
        state.isdelLoader = false;
        state.loading = "fulfilled";
        state.error = null;
      })
      .addCase(deleteLearnerData.rejected, (state, action) => {
        state.isdelLoader = false;
        state.loading = "rejected";
        state.error = action.payload as string;
      })
      .addCase(createBatchTopic.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createBatchTopic.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.error = null;
      })
      .addCase(createBatchTopic.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload as string;
      })
      .addCase(getLearner.pending, (state) => {
        state.loading = "pending";
        state.isLoader = true;
      })
      .addCase(getLearner.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.learnerData = action.payload;
        state.error = null;
        state.isLoader = false;
      })
      .addCase(getLearner.rejected, (state, action) => {
        state.isLoader = false;
        state.loading = "rejected";
        state.error = action.payload as string;
      })
      .addCase(getSingleLearner.pending, (state) => {
        state.loading = "pending";
        state.isLoader = true;
      })
      .addCase(getSingleLearner.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.SingleLearner = action.payload;
        state.error = null;
        state.isLoader = false;
      })
      .addCase(getSingleLearner.rejected, (state, action) => {
        state.isLoader = false;
        state.loading = "rejected";
        state.error = action.payload as string;
      })
      .addCase(updateLearner.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateLearner.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.error = null;
      })
      .addCase(updateLearner.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload as string;
      });
  },
});

export default learnerSlice.reducer;
