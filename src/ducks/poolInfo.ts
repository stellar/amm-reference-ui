import StellarSdk from "stellar-sdk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "config/store";
import { TESTNET_NETWORK_URL } from "constants/apiUrls";
import { getErrorString } from "helpers/getErrorString";
import { fetchPoolInfo } from "helpers/fetchPoolInfo";
import {
  ActionStatus,
  RejectMessage,
  PoolInfoInitialState,
  LiquidityPoolInfo,
} from "types/types.d";

export const fetchPoolInfoAction = createAsyncThunk<
  LiquidityPoolInfo,
  string,
  { rejectValue: RejectMessage; state: RootState }
>("poolInfo/fetchPoolInfoAction", async (poolId, { rejectWithValue }) => {
  const server = new StellarSdk.Server(TESTNET_NETWORK_URL);
  let poolTransactions = null;

  try {
    poolTransactions = await fetchPoolInfo({ server, poolId });
  } catch (error) {
    return rejectWithValue({
      errorString: getErrorString(error),
    });
  }

  return poolTransactions;
});

const initialState: PoolInfoInitialState = {
  data: null,
  status: undefined,
  errorString: undefined,
};

const poolInfoSlice = createSlice({
  name: "poolInfo",
  initialState,
  reducers: {
    resetPoolInfoAction: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPoolInfoAction.pending, (state = initialState) => {
      state.status = ActionStatus.PENDING;
    });
    builder.addCase(fetchPoolInfoAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = ActionStatus.SUCCESS;
    });
    builder.addCase(fetchPoolInfoAction.rejected, (state, action) => {
      state.status = ActionStatus.ERROR;
      state.errorString = action.payload?.errorString;
    });
  },
});

export const poolInfoSelector = (state: RootState) => state.poolInfo;

export const { reducer } = poolInfoSlice;
export const { resetPoolInfoAction } = poolInfoSlice.actions;
