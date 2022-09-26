import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: { name: 'kim', age: 20 },
  reducers: {
    // state 변경함수를 action이라고 합니다.
    changeName(state) {
      // state는 initialState 의미
      // return { name: 'park', age: 20 };
      // 이렇게도 변경 가능함
      // state가 object/array면 return 없이 직접 수정해도 됩니다
      state.name = 'park';
    },
    changeAge(state, a) {
      // payload뜻 : 화물, 소포, 택배
      // 사용 : changeAge(100)
      state.age += a.payload;
    },
  },
});

export let { changeName, changeAge } = user.actions;

export default user;
