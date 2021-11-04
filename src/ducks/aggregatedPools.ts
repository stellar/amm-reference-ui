import { getCatchError } from "@stellar/frontend-helpers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "config/store";
import { fetchAggregatedPools } from "helpers/fetchAggregatedPools";
import {
  ActionStatus,
  RejectMessage,
  AggregatedPoolsInitialState,
  LiquidityPoolDetails,
} from "types/types.d";

export const fetchAggregatedPoolsAction = createAsyncThunk<
  LiquidityPoolDetails[],
  void,
  { rejectValue: RejectMessage; state: RootState }
>(
  "aggregatedPools/fetchAggregatedPoolsAction",
  async (_, { rejectWithValue }) => {
    let aggregatedPools = [];

    try {
      aggregatedPools = await fetchAggregatedPools();
    } catch (error) {
      return rejectWithValue({
        errorString: getCatchError(error).message,
      });
    }

    return aggregatedPools;
  },
);

const initialState: AggregatedPoolsInitialState = {
  data: [],
  status: undefined,
  errorString: undefined,
};

const aggregatedPoolsSlice = createSlice({
  name: "aggregatedPools",
  initialState,
  reducers: {
    resetAggregatedPoolsAction: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAggregatedPoolsAction.pending,
      (state = initialState) => {
        state.status = ActionStatus.PENDING;
      },
    );
    builder.addCase(fetchAggregatedPoolsAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = ActionStatus.SUCCESS;
    });
    builder.addCase(fetchAggregatedPoolsAction.rejected, (state, action) => {
      state.status = ActionStatus.ERROR;
      state.errorString = action.payload?.errorString;
    });
  },
});

export const aggregatedPoolsSelector = (state: RootState) =>
  state.aggregatedPools;

export const { reducer } = aggregatedPoolsSlice;
export const { resetAggregatedPoolsAction } = aggregatedPoolsSlice.actions;
