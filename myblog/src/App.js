import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  // let name = "홍길동";

  // let name = useState('홍길동');
  // state는 변수처럼 사용되는 공간
  // let 변수이름 = useState('초기값');

  // state에 저장된 데이터를 변경하고 싶을 때는 어떻게 해야 할까?
  let [name, setName] = useState('홍길동');
  // setName 함수는 state값을 '교체'하기 위해서 사용되는 함수
  // setName('고길동');

  // let [subject1, setSubject1] = useState('스프링 공부');
  // let [subject2, setSubject2] = useState('자바스크립트 공부');
  // let [subject3, setSubject3] = useState('jQuery 공부');

  let [subject, setSubject] = useState(['스프링 공부', '자바스크립트 공부', 'jQuery 공부']);

  let [favor, changeFavor] = useState([0, 0, 0]);

  function aa() {
    console.log(1);
  }

  let [modal, setModal] = useState(0);  // 플래그
                                        // 0이면 비출력, 1이면 출력
                                        // false라면 비출력, true라면 출력

  let [subjectIdx, setSubjectIdx] = useState(0);
                                    // 제목을 클릭하면 해당 제목의 인덱스를 기억하는 스테이트

  let [inputData, setInputData] = useState('');
                                  // input 태그를 이용한 데이터를 저장하기 위한 스테이트

  let [testData, setTestData] = useState('테스트');

  function test1(){
    // 배열 객체의 map 함수
  let arr = [2, 4, 6, 8];

  // 일반적인 반복문
  // for(let i=0; i<arr.length; i++){
  //   console.log(i + " : " + arr[i]);
  // }

  // 배열 객체에는 모든 요소를 조회하기 위한 mpa 함수가 존재
  arr.map(function(a, b){ // 배열의 각 요소마다 동작되는 함수
    console.log(b + " : " + a); // a : 배열의 각 요소 / b : 인덱스
  });

  // map 함수의 반환 데이터를 또다른 배열로 출력
  let coppyArr = arr.map(function(a, b){
                          return a*3; // 배열의 각 요소에서 3을 곱한 후 나오는 데이터를 또다른 배열로 출력
                        });
    console.log(coppyArr); // [6, 12, 18, 24]
  }
 
  return (
    <div>
      <div className='App'>
        <header className='header'>
          <h3>내 블로그</h3>
        </header>
      </div>
      <input type='text' onChange={(event)=>{
        console.log(event.target.value);
        // 입력받은 텍스트를 저장 => state
        setInputData(event.target.value);
        // 스테이트 변경 작업은 비동기로 처리되므로 조금 늦게 처리될 수 있다. 
        console.log(inputData);
      }}/>
      <button onClick={()=>{
        let copySubject = [...subject];
        let copyFavor = [...favor];

        copySubject.unshift(inputData);
        copyFavor.unshift(0);

        setSubject(copySubject);
        changeFavor(copyFavor);
      }}>발행</button>
      <br/>
      {/* <button className='btn_list' onClick={function() {
        let copy = [...subject];
        copy[0] = '자바스크립트 공부';
        copy[1] = 'jQuery 공부';
        copy[2] = '파이썬 공부';
        
        setSubject(copy);
      }}>가나다순 정렬</button>
      <div className='list first'>
        <h4 className='display'>{subject[0]}
          <span onClick={function() {
            let copy = [...favor];
            copy[0] = copy[0]+1;

            changeFavor(copy);
          }}> 👍 </span>{favor[0]}</h4>
          <button className='display' onClick={function() {
            // setSubject('파이썬 공부');
            // setSubject(['파이썬 공부', '자바스크립트 공부', 'jQuery 공부']);
            // let copy = subject; // => 배열의 주소만 복사
            // copy[0] = '파이썬 공부';

            let copy = [...subject]; // 배열 데이터의 깊은 복사를 처리
            copy[0] = '파이썬 공부';

            setSubject(copy);
          }}>과목변경</button>
        <p>2월 15일</p>
      </div>
      <div className='list'>
        <h4 onClick={function() {
        }}>{subject[1]}
        <span onClick={function() {
            let copy = [...favor];
            copy[1] = copy[1]+1;

            changeFavor(copy);
          }}> 👍 </span>{favor[1]}</h4>
        <p>2월 16일</p>
      </div>
      <div className='list'>
        <h4 onClick={()=>{
        }}>{subject[2]}
        <span onClick={function() {
            let copy = [...favor];
            copy[2] = copy[2]+1;

            changeFavor(copy);
          }}> 👍 </span>{favor[2]}</h4>
        <p>2월 17일</p>
      </div> */}

      <button onClick={function(){
        if(modal == 0){
          setModal(1);
        }else{
          setModal(0);
        }
      }}>상세보기</button>

      <button onClick={test1}>테스트</button>
      
      {
      subject.map(function(a, b){
        return(
          <div className='list' key={b}>
            <Subject
            a = {a}
            b = {b}
            setModal = {setModal}
            setSubjectIdx = {setSubjectIdx}
            favor = {favor}
            changeFavor = {changeFavor}
            subject = {subject}
            setSubject = {setSubject}
            ></Subject>
            {/* <h4 onClick={function(){
                        setModal(1);
                        setSubjectIdx(b);
                        }}>{a}
              <span onClick={
                function() {
                  let copy = [...favor];
                  copy[b] = copy[b]+1;

                  changeFavor(copy);
                }}> 👍 </span>
          {favor[b]}</h4>
            <p>2월 15일</p>
            <button onClick={function(){
              setModal(0); // 상세보기 끄기
              let copySubject = [...subject];
              let copyFavor = [...favor];

              copySubject.splice(b, 1);
              copyFavor.splice(b, 1);

              setSubject(copySubject);
              changeFavor(copyFavor);
            }}>삭제</button> */}
          </div>
          );
        })
      }
      <Modal2 data={subject} changeData={setTestData}></Modal2>
      <p>{testData}</p>
      {
        modal == 1 ? <Modal name={subject} idx={subjectIdx}></Modal> : null
      }
    </div>
  );
}
// {} 데이터를 출력하기 위한 바인딩 기호
// {modal} 0 출력
// {modal == 0} true 출력
// {null} 미출력
// {<Modal></Modal>} 컴포넌트 출력

function Subject(props){
  // a, b, setModal, setSubjectIdx, favor, changeFavor, subject, setSubject
  return (
    <div>
      <h4 onClick={function () {
        props.setModal(1);
        props.setSubjectIdx(props.b);
      }}>{props.a}
        <span onClick={
          function () {
            let copy = [...props.favor];
            copy[props.b] = copy[props.b] + 1;

            props.changeFavor(copy);
          }}> 👍 </span>
        {props.favor[props.b]}</h4>
      <p>2월 15일</p>
      <button onClick={function () {
        props.setModal(0); // 상세보기 끄기
        let copySubject = [...props.subject];
        let copyFavor = [...props.favor];

        copySubject.splice(props.b, 1);
        copyFavor.splice(props.b, 1);

        props.setSubject(copySubject);
        props.changeFavor(copyFavor);
      }}>삭제</button>
    </div>
  );
}

function Modal(props){ // 컴포넌트

  let [test, setTest] = useState('홍길동');

  // 부모 컴포넌트가 넣어 준 속성을 꺼내볼 수 있다.
  return(
    <div className='modal'>
        <h4>{props.name[props.idx]}</h4>
        <p>2월 15일</p>
        <p>상세 내용 : {test}</p>
      </div>
  );
}

class Modal2 extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      name : '홍길동',
      age : 20
    }
  }

  render(){
    return(
      <div>
        <p>클래스를 이용한 컴포넌트</p>
        <p>
          {this.state.name}님 안녕
          <button onClick={()=>{
            this.setState({name : '고길동'});
          }}>이름변경</button>
        </p>
        <p>{this.props.data[0]}</p>
        <button onClick={()=>{
          this.props.changeData('수정된 글');
        }}>데이터 변경</button>
      </div>
    );
  }
}

// function Subject1(){
//   return(
//     <div className='list'>
//       <h4>스프링 공부</h4>
//       <p>2월 15일</p>
//     </div>
//   );
// }

// function Subject2(){
//   return(
//     <div className='list'>
//       <h4>자바스크립트 공부</h4>
//       <p>2월 16일</p>
//     </div>
//   );
// }

// function Subject3(){
//   return(
//     <div className='list'>
//       <h4>jQuery 공부</h4>
//       <p>2월 17일</p>
//     </div>
//   );
// }

export default App;
