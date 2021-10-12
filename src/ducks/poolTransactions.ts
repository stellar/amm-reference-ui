import StellarSdk from "stellar-sdk";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "config/store";
import { TESTNET_NETWORK_URL } from "constants/apiUrls";
import { getErrorString } from "helpers/getErrorString";
import { fetchPoolTransactions } from "helpers/fetchPoolTransactions";
import {
  ActionStatus,
  RejectMessage,
  PoolTransactionsInitialState,
  LiquidityPoolTransaction,
} from "types/types.d";

export const fetchPoolTransactionsAction = createAsyncThunk<
  LiquidityPoolTransaction[],
  string,
  { rejectValue: RejectMessage; state: RootState }
>(
  "poolTransactions/fetchPoolTransactionsAction",
  async (poolId, { rejectWithValue }) => {
    const server = new StellarSdk.Server(TESTNET_NETWORK_URL);
    let poolTransactions = [];

    try {
      poolTransactions = await fetchPoolTransactions({ server, poolId });
    } catch (error) {
      return rejectWithValue({
        errorString: getErrorString(error),
      });
    }

    return poolTransactions;
  },
);

const initialState: PoolTransactionsInitialState = {
  data: [],
  status: undefined,
  errorString: undefined,
};

const poolTransactionsSlice = createSlice({
  name: "poolTransactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPoolTransactionsAction.pending,
      (state = initialState) => {
        state.status = ActionStatus.PENDING;
      },
    );
    builder.addCase(fetchPoolTransactionsAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = ActionStatus.SUCCESS;
    });
    builder.addCase(fetchPoolTransactionsAction.rejected, (state, action) => {
      state.status = ActionStatus.ERROR;
      state.errorString = action.payload?.errorString;
    });
  },
});

export const poolTransactionsSelector = (state: RootState) =>
  state.poolTransactions;

export const { reducer } = poolTransactionsSlice;
