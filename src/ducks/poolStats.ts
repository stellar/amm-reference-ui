import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "config/store";
import { getErrorString } from "helpers/getErrorString";
import { fetchPoolStats } from "helpers/fetchPoolStats";
import {
  ActionStatus,
  RejectMessage,
  PoolStatsInitialState,
  LiquidityPoolStats,
} from "types/types.d";

export const fetchPoolStatsAction = createAsyncThunk<
  LiquidityPoolStats,
  string,
  { rejectValue: RejectMessage; state: RootState }
>("poolStats/fetchPoolStatsAction", async (poolId, { rejectWithValue }) => {
  let poolStats = null;

  try {
    poolStats = await fetchPoolStats(poolId);
  } catch (error) {
    return rejectWithValue({
      errorString: getErrorString(error),
    });
  }

  return poolStats;
});

const initialState: PoolStatsInitialState = {
  data: null,
  status: undefined,
  errorString: undefined,
};

const poolStatsSlice = createSlice({
  name: "poolStats",
  initialState,
  reducers: {
    resetPoolStatsAction: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPoolStatsAction.pending, (state = initialState) => {
      state.status = ActionStatus.PENDING;
    });
    builder.addCase(fetchPoolStatsAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = ActionStatus.SUCCESS;
    });
    builder.addCase(fetchPoolStatsAction.rejected, (state, action) => {
      state.status = ActionStatus.ERROR;
      state.errorString = action.payload?.errorString;
    });
  },
});

export const poolStatsSelector = (state: RootState) => state.poolStats;

export const { reducer } = poolStatsSlice;
export const { resetPoolStatsAction } = poolStatsSlice.actions;
