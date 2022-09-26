// html에서 public폴더 이미지 사용할 땐 그냥 /이미지경로 하고 쓰면됨
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from 'react-bootstrap';
import data from './data.js';
import { useState, createContext } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './View/DetailPage/DetailPage.js';
import axios from 'axios';
import Cart from './View/CartPage/Cart';

// Context API, Context는 state 보관함이다
// 1. createContext 2. ... 3. ...

// Context API 쓰면 props 전송없이 state 공유가능
// 실전에서는 잘 안씀 1. 성능 이슈 2. 컴포넌트 재활용 어려움
// 3. 쓸데없는 것까지 재렌더링 4. 외부 라이브러리 사용(Redux)

// export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  // navigate(1) 앞으로 가기, navigate(-1) 뒤로 가기
  // 404 page는 path = "*" 로 지정하면됨 -> 일명 없는페이지
  let navigate = useNavigate();
  let btnCount = 0;
  let [재고] = useState([10, 11, 12]);

  return (
    <div className="App">
      {/* className 부여해서 더 꾸밀수 있다 */}
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/detail');
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Link></Link>

      {/* 코드는 맞는데 title가지곤 정렬이 안됨. 왜 안되는지 모름 씨발 */}
      <button
        style={{ height: '80px', width: '200px' }}
        onClick={() => {
          let sortShoes = [...shoes];
          console.log(sortShoes);
          sortShoes.sort((a, b) => {
            return a.title.toLowerCase() - b.title.toLowerCase();
          });
          setShoes(sortShoes);
        }}
      >
        가나다순
      </button>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div>
                <div className="container">
                  <div className="row">
                    {shoes.map(function (a, i) {
                      return <Card shoes={shoes[i]} i={i}></Card>;
                    })}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  // 1. 로딩중 UI 띄우기~
                  Promise.all([axios.get('https://codingapple1.github.io/shop/data2.json'), axios.get('https://codingapple1.github.io/shop/data3.json')])
                    .then((result) => {
                      console.log(result[1].data);
                      btnCount++;
                      if (btnCount === 1) {
                        let copy = [...shoes, ...result[0].data];
                        setShoes(copy);
                      } else if (btnCount === 2) {
                        let copy = [...shoes, ...result[0].data, ...result[1].data];
                        setShoes(copy);
                      } else {
                        alert('더 이상 상품이 없습니다');
                      }

                      // 2. 로딩중 UI 숨기기~
                    })
                    .catch(() => {
                      console.log('Failed to recieve');

                      // 2. 로딩중 UI 숨기기~
                    });
                }}
              >
                더보기
              </button>
            </>
          }
        />

        {/* Detail ~ 안에 모든 컴포넌트는 재고,shoes 사용가능 */}
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />

        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="80%"></img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
