// Redux 사용하면 컴포넌트들이 props 없이 state 공유가능
// 컴포넌트간에 state 공유가 편해짐
// -> 사이즈 커지면 필수(component 갯수가 많아질 경우)

// Redux Setting
// 1. store.js 파일생성 & 코드복붙
// 2. index.js 가서 <Provider store={store}> 쓰기
// store.js 에 있던 state 전부 사용가능

// Redux state 변경하는 법
// 1. state 수정해주는 함수만들기.
// 2. export
// 3. 원할 때 그 함수 실행해달라고 store.js 에 요청(부탁만 함) : dispatch(state 변경함수())
// 요청만 하면 편한 이유 : 범인찾을 때 요청한 곳(store.js)만 뒤지면 되기 때문

import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './Store/userSlice';

let cart = createSlice({
  name: 'cart',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 1, name: 'Grey Yordan', count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      // a는 반복문의 index와 같다
      // let index = state.findIndex((a)=>{ return a.id === action.payload })
      for (let i = 0; i < state.length; i++) {
        if (action.payload === state[i].id) {
          state[i].count++;
          break;
        }
      }
    },
    addItem(state, action) {
      console.log(action.payload);
      state.push(action.payload);
    },
    deleteItem(state, action) {
      let index = state.findIndex((a) => {
        return a.id === action.payload;
      });
      console.log(index);
      state.splice(index, 1);
    },
  },
});

export let { addCount, addItem, deleteItem } = cart.actions;

let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
});

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
    stock: stock.reducer,
  },
});
