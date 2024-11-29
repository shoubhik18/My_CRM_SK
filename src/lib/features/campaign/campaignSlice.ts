import { del, get, post, put } from "@/api/base";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CampaignState {
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
  isLoader: boolean;
  campaignData: any;
  singleCampaignData: any;
  isdelLoader: boolean;
}

const initialState: CampaignState = {
  loading: "idle",
  error: null,
  isLoader: false,
  campaignData: [],
  singleCampaignData: null,
  isdelLoader: false,
};

export const createCampaign = createAsyncThunk(
  "createCampaign",
  async (body: any) => {
    try {
      const response = await post("campaigns", body);
      return response;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const getCampaign = createAsyncThunk("getCampaign", async () => {
  try {
    const response = await get(`campaigns`);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
});

export const updateCampaign = createAsyncThunk(
  "updateCampaign",
  async (data: any) => {
    try {
      const response = await put(`campaigns/${data?.id}`, data?.data);
      return response;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const deleteCampaignData = createAsyncThunk(
  "/deleteCampaignData",
  async (ids: any) => {
    try {
      const response = await del(`campaigns/delete?ids=${ids}`);
      return response;
    } catch (error: any) {
      throw new Error(JSON.stringify(error.response.data));
    }
  }
);

export const getSingleCampaign = createAsyncThunk(
  "getSingleCampaign",
  async (id: number) => {
    try {
      const response = await get(`campaigns/${id}`);
      return response;
    } catch (error: any) {
      // If an error occurs, return the error response data
      throw new Error(error.response.data);
    }
  }
);

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCampaign.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.error = null;
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload as string;
      })
      .addCase(getCampaign.pending, (state) => {
        state.loading = "pending";
        state.isLoader = true;
      })
      .addCase(getCampaign.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.campaignData = action.payload;
        state.error = null;
        state.isLoader = false;
      })
      .addCase(getCampaign.rejected, (state, action) => {
        state.isLoader = false;
        state.loading = "rejected";
        state.error = action.payload as string;
      })
      .addCase(getSingleCampaign.pending, (state) => {
        state.loading = "pending";
        state.isLoader = true;
      })
      .addCase(getSingleCampaign.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.singleCampaignData = action.payload;
        state.error = null;
        state.isLoader = false;
      })
      .addCase(getSingleCampaign.rejected, (state, action) => {
        state.isLoader = false;
        state.loading = "rejected";
        state.error = action.payload as string;
      })
      .addCase(updateCampaign.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.error = null;
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload as string;
      })
      .addCase(deleteCampaignData.pending, (state) => {
        state.isdelLoader = true;
        state.loading = "pending";
      })
      .addCase(deleteCampaignData.fulfilled, (state, action) => {
        state.isdelLoader = false;
        state.loading = "fulfilled";
        state.error = null;
      })
      .addCase(deleteCampaignData.rejected, (state, action) => {
        state.isdelLoader = false;
        state.loading = "rejected";
        state.error = action.payload as string;
      });
  },
});

export default campaignSlice.reducer;
