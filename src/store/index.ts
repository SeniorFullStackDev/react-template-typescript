/* eslint-disable no-param-reassign */
import {
  combineReducers,
  configureStore,
  createSlice,
  getDefaultMiddleware,
  PayloadAction,
} from '@reduxjs/toolkit';
// import { v1 as uuid } from "uuid";
import logger from 'redux-logger';

import { User } from './type';

const userInitialState: User = {
  id: '',
  score: 0,
};

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: userInitialState,
  reducers: {
    login: (state, { payload }: PayloadAction<{ id: string; score: number }>) => {
      state.id = payload.id;
      state.score = payload.score;
    },
    addScore: (state, { payload }: PayloadAction<{ points: number }>) => {
      state.score += payload.points;
    },
    removeScore: (state, { payload }: PayloadAction<{ points: number }>) => {
      state.score -= payload.points;
    },
  },
});

export const {
  login: loginActionCreator,
  addScore: addScoreActionCreator,
  removeScore: removeScoreTodoActionCreator,
} = userDetailsSlice.actions;

// export const { select: selectTodoActionCreator } = selectedTodoSlice.actions;

const reducer = combineReducers({
  userDetails: userDetailsSlice.reducer,
});

const middleware = [...getDefaultMiddleware(), logger];
export default configureStore({
  reducer,
  middleware,
});

// const selectedTodoSlice = createSlice({
//   name: "selectedTodo",
//   initialState: null as string | null,
//   reducers: {
//     select: (state, { payload }: PayloadAction<{ id: string }>) => payload.id
//   }
// });

// const counterSlice = createSlice({
//   name: "counter",
//   initialState: 0,
//   reducers: {},
//   extraReducers: {
//     [userDetailsSlice.actions.create.type]: state => state + 1,
//     [userDetailsSlice.actions.edit.type]: state => state + 1,
//     [userDetailsSlice.actions.toggle.type]: state => state + 1,
//     [userDetailsSlice.actions.remove.type]: state => state + 1
//   }
// });
