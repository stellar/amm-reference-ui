import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "config/store";
import { getErrorString } from "helpers/getErrorString";
import { getAssetAvatarProps } from "helpers/getAssetAvatarProps";
import {
  ActionStatus,
  RejectMessage,
  PoolAvatarsInitialState,
  LiquidityPoolReserve,
  AssetAvatar,
} from "types/types.d";

export const fetchPoolAvatarsAction = createAsyncThunk<
  AssetAvatar[],
  LiquidityPoolReserve[],
  { rejectValue: RejectMessage; state: RootState }
>(
  "poolAvatars/fetchPoolAvatarsAction",
  async (reserves, { rejectWithValue }) => {
    let assetAvatars = [];

    try {
      assetAvatars = await Promise.all(
        reserves.map((r) => getAssetAvatarProps(r.asset)),
      );
    } catch (error) {
      return rejectWithValue({
        errorString: getErrorString(error),
      });
    }

    return assetAvatars;
  },
);

const initialState: PoolAvatarsInitialState = {
  data: [
    {
      altText: "asset-1",
      iconUrl: "",
    },
    {
      altText: "asset-2",
      iconUrl: "",
    },
  ],
  status: undefined,
  errorString: undefined,
};

const poolAvatarsSlice = createSlice({
  name: "poolAvatars",
  initialState,
  reducers: {
    resetPoolAvatarsAction: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPoolAvatarsAction.pending, (state = initialState) => {
      state.status = ActionStatus.PENDING;
    });
    builder.addCase(fetchPoolAvatarsAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = ActionStatus.SUCCESS;
    });
    builder.addCase(fetchPoolAvatarsAction.rejected, (state, action) => {
      state.status = ActionStatus.ERROR;
      state.errorString = action.payload?.errorString;
    });
  },
});

export const poolInfoSelector = (state: RootState) => state.poolInfo;

export const { reducer } = poolAvatarsSlice;
export const { resetPoolAvatarsAction } = poolAvatarsSlice.actions;
