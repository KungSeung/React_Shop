import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { changeState } from './../../store';

// import { Context1 } from './../../App.js';

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg === 'blue' ? 'white' : 'black')};
  padding: 10px;
`;

function Div() {
  return <div className="alert alert-warning">2초 이내 구매시 할인</div>;
}

function Detail(props) {
  // let { 재고 } = useContext(Context1);

  let [count, setCount] = useState(0);
  let [div, setDiv] = useState(true);
  let [input, setInput] = useState();
  let [tab, setTab] = useState(0);

  let { id } = useParams(); // :id 값이 남음
  let findShoes = props.shoes.find(function (x) {
    return x.id === id;
  });

  useEffect(() => {
    let a = setTimeout(() => {
      setDiv(false);
    }, 2000);

    if (isNaN(input) === true) {
      alert('그러지 마세요');
    }
    return () => {
      clearTimeout(a);
    };
  }, [input]);

  return (
    <div className="container">
      {div === true ? <Div></Div> : null}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
        {count}
      </button>
      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes1.jpg'} width="100%"></img>
        </div>
        <div className="col-md-6">
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></input>
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p>
          <button className="btn btn-danger" onClick={() => {}}>
            주문하기
          </button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent shoes={props.shoes} tab={tab} />
    </div>
  );
}
// 일반 if 조건문 쓰려면?
// 1. Component 사용, props 사용
// 2. props 안 쓰고 싶으면 {tab} 이런식으로 인자 전달해도됨
// 3. {tab} 주고 [<div></div> ... ][tab] 이런식으로 주면 배열의 index(=tab)에 해당하는
// data가 그 자리에 남는다.

function TabContent({ tab }) {
  let [fade, setFade] = useState('');
  // let { 재고 } = useContext(Context1);

  useEffect(() => {
    setFade('end');
    return () => {
      setFade('');
    };
  }, [tab]);
  return <div className={'start ' + fade}>{[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}</div>;
}

export default Detail;
