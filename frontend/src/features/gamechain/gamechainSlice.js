import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMonsters, getOwnerMonsters } from "../../utils/gamechain";

export const fetchMonsters = createAsyncThunk("monsters/all", async () => {
  const monsters = await getMonsters();
  return monsters;
});

export const fetchUserMonsters = createAsyncThunk(
  "monsters/userMonsters",
  async (address) => {
    const userMonsters = await getOwnerMonsters(address);
    return userMonsters;
  }
);

const gamechainSlice = createSlice({
  name: "gamechain",
  initialState: {
    monsters: [],
    userMonsters: [],
    balance: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonsters.fulfilled, (state, action) => {
        state.monsters = action.payload;
      })
      .addCase(fetchMonsters.rejected, (action) => {
        console.log(action.error);
      })
      .addCase(fetchUserMonsters.fulfilled, (state, action) => {
        state.userMonsters = action.payload;
      })
      .addCase(fetchUserMonsters.rejected, (action) => {
        console.log(action.error);
      });
  },
});

export const getUploadedMonsters = (state) => state.gamechain.monsters;
export const getUserMonsters = (state) => state.gamechain.userMonsters;
export const getBalance = (state) => state.gamechain.balance;

export default gamechainSlice.reducer;
