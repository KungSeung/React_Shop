import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeName, changeAge } from './../../Store/userSlice';
import { changeCount } from './../../store';

function Cart() {
  let state = useSelector((state) => {
    return state;
  });
  // dispatch 함수 : store.js로 요청보내주는 함수
  let dispatch = useDispatch();
  return (
    <div>
      <h6>
        {state.user.name} {state.user.age}의 장바구니
      </h6>
      <button
        onClick={() => {
          dispatch(changeAge(100));
        }}
      >
        증가
      </button>
      <Table>
        <thead>
          {/* tr은 행, th랑 td는 열 */}
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{state.cart[i].id}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td>1</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(changeName());
                    dispatch(changeCount(i));
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
