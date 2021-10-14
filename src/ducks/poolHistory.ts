import { getCatchError } from "@stellar/frontend-helpers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "config/store";
import { fetchPoolHistory } from "helpers/fetchPoolHistory";
import {
  ActionStatus,
  RejectMessage,
  PoolHistoryInitialState,
  LiquidityPoolHistory,
} from "types/types.d";

export const fetchPoolHistoryAction = createAsyncThunk<
  LiquidityPoolHistory[],
  string,
  { rejectValue: RejectMessage; state: RootState }
>(
  "poolTransactions/fetchPoolHistoryAction",
  async (poolId, { rejectWithValue }) => {
    let poolHistory = [];

    try {
      poolHistory = await fetchPoolHistory({ poolId });
    } catch (error) {
      return rejectWithValue({
        errorString: getCatchError(error).message,
      });
    }

    console.log(poolHistory);

    return poolHistory;
  },
);

const initialState: PoolHistoryInitialState = {
  data: [],
  status: undefined,
  errorString: undefined,
};

const poolHistorySlice = createSlice({
  name: "poolHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPoolHistoryAction.pending, (state = initialState) => {
      state.status = ActionStatus.PENDING;
    });
    builder.addCase(fetchPoolHistoryAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = ActionStatus.SUCCESS;
    });
    builder.addCase(fetchPoolHistoryAction.rejected, (state, action) => {
      state.status = ActionStatus.ERROR;
      state.errorString = action.payload?.errorString;
    });
  },
});

export const poolHistorySelector = (state: RootState) => state.poolHistory;

export const { reducer } = poolHistorySlice;
