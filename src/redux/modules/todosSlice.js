import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from "../../utils";

export const __addToDo = createAsyncThunk(
  "__addToDo",
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    return payload;
  }
);

export const __deleteTodo = createAsyncThunk(
  "__deleteToDo",
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    console.log(payload);
    return payload;
  }
);

const initialState = {
  list: [{ id: 0, title: "example", content: "example" }],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTodo: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(__addToDo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(__addToDo.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(__addToDo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(__deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload);
        state.status = "succeeded";
      })
      .addCase(__deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
