import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "config/store";
import { getErrorString } from "helpers/getErrorString";
import { fetchPoolDetails } from "helpers/fetchPoolDetails";
import {
  ActionStatus,
  RejectMessage,
  PoolDetailsInitialState,
  LiquidityPoolDetails,
} from "types/types.d";

export const fetchPoolDetailsAction = createAsyncThunk<
  LiquidityPoolDetails,
  string,
  { rejectValue: RejectMessage; state: RootState }
>("poolDetails/fetchPoolDetailsAction", async (poolId, { rejectWithValue }) => {
  let poolTransactions = null;

  try {
    poolTransactions = await fetchPoolDetails(poolId);
  } catch (error) {
    return rejectWithValue({
      errorString: getErrorString(error),
    });
  }

  return poolTransactions;
});

const initialState: PoolDetailsInitialState = {
  data: null,
  status: undefined,
  errorString: undefined,
};

const poolDetailsSlice = createSlice({
  name: "poolDetails",
  initialState,
  reducers: {
    resetPoolDetailsAction: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPoolDetailsAction.pending, (state = initialState) => {
      state.status = ActionStatus.PENDING;
    });
    builder.addCase(fetchPoolDetailsAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = ActionStatus.SUCCESS;
    });
    builder.addCase(fetchPoolDetailsAction.rejected, (state, action) => {
      state.status = ActionStatus.ERROR;
      state.errorString = action.payload?.errorString;
    });
  },
});

export const poolDetailsSelector = (state: RootState) => state.poolDetails;

export const { reducer } = poolDetailsSlice;
export const { resetPoolDetailsAction } = poolDetailsSlice.actions;
