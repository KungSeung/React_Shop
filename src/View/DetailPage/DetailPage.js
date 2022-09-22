import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useState } from 'react';

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg === 'blue' ? 'white' : 'black')};
  padding: 10px;
`;

function Div() {
  return <div className="alert alert-warning">2초 이내 구매시 할인</div>;
}

function Detail(props) {
  let [count, setCount] = useState(0);
  let [div, setDiv] = useState(true);
  let [input, setInput] = useState();

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
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
