/*eslint-disable*/

import './App.css';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import {Container, Nav, Navbar, Row, Col, Button} from 'react-bootstrap';
import {a, b} from './data0.js';
import data from './data';
import { createContext, useEffect, useState } from 'react';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './page/Detail';
import axios from 'axios';
import Cart from './page/Cart.js';

export let Context = createContext();  // 데이터 공유 저장소
let Context2 = createContext();

function App() {

  let [item, setItem] = useState(data);
  // let [item, setItem] = useState(['']);

  // useEffect(()=>{
  //   axios.get('/ajaxTest/ods1')
  //     .then((result) => { // 데이터 수신이 성공적일 때 동작할 기능
  //       // console.log(result.data);
  //       setItem(result.data);
  //     }).catch(() => {    // 데이터 수신이 실패했을 때 동작할 기능
  //       console.log('전송 실패');
  //     });
  // }, [])

  let navi = useNavigate();

  // 과제
  // 정렬 버튼 : 상품명 기준으로 정렬되는 버튼
  //            정렬 후 상세보기에서도 정렬 순서대로 상품이 출력되도록

  // [정렬 버튼]
  // 1. 버튼 생성
  // 2. 스테이트(item)를 복사 : let copyItem = [...item];
  // 3. 복사된 배열을 정렬 : copyItem.sort();
  // 4. 정렬 기준 제시 : copyItem.sort((a, b) => 정렬 기준);
  // 5. 정렬된 배열을 다시 스테이트에 저장 : setItem(copyItem);

  // [정렬에 맞는 이미지 출력 변경]
  // 1. Product 컴포넌트에 넣어 줄 b값(인덱스값)을 
  //    기존 배열 인덱스를 사용하는 것이 아니라 배열 내부의 id값을 사용하도록 변경
  //    : <img src={process.env.PUBLIC_URL + props.image[props.b]} width='80%'/>
  //    -> <img src={props.item[props.b].image} width='80%'/>

  // [Detail] 페이지]
  // 1. 주소창에 직접 detail/0 입력 시 기존 스테이트 사용
  // 2. 링크 버튼 경로를 /detail -> /detail/0 으로 변경하여 체크
  //    : <Button variant="light" onClick={()=>{navi('/detail')}}>상세보기</Button>
  //    -> <Button variant="light" onClick={()=>{navi('/detail/0')}}>상세보기</Button>

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">HOME</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Link to="/" style={{color:'white', marginRight:'10px'}}>홈</Link>{'  '}
            <Link to="/detail" style={{color:'white', marginRight:'10px'}}>상세보기</Link>{'  '}
            <Link to="/info" style={{color:'white', marginRight:'10px'}}>정보보기</Link>{'  '} */}
            <Button variant="light" onClick={()=>{navi('/')}}>홈</Button>
            <Button variant="light" onClick={()=>{navi('/detail/0')}}>상세보기</Button>
            <button onClick={()=>{navi('/info')}}>정보보기</button>
            <Button variant="light" onClick={()=>{navi('/cart')}}>장바구니</Button>
            <button onClick={()=>{
              let copyItem = [...item];
              // copyItem.sort((a, b) => a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 1);
              copyItem.sort((a,b)=>{
                let aTitle = a.title;
                let bTitle = b.title;

                if(aTitle < bTitle){
                  return -1;
                }else if(aTitle > bTitle){
                  return 1;
                }else{
                  return 0;
                }
              });
              console.log(copyItem);
              setItem(copyItem);
            }}>정렬</button>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Main item={item} setItem={setItem}/>}/>
        <Route path="/detail/:id" element={
          <Context.Provider value={{item}}>
            <Detail item={item}/>
          </Context.Provider>
        }/>
        <Route path="/info" element={<Info/>}>
          <Route path="member" element={<div>사원 정보 보기</div>}/>
          <Route path="location" element={<div>회사 위치 정보 보기</div>}/>
        </Route>
        <Route path="/cart" element={<Cart/>}/>

        <Route path="*" element={<div>공사중 페이지</div>}/>
      </Routes>
    </div>
  );
}

function Info() {
  return (
    <div>
      <h4>공통 정보 보기</h4>
      {/* 하위 페이지를 끼워 넣는 방식 */}
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
    <Col md={4}>
      <img src={process.env.PUBLIC_URL + './img/item'+(props.idx+1)+'.jpg'} width='80%'/>
      <h4>{props.element.title}</h4>
      <p>{props.element.price}</p>
    </Col>
  )
}

function Main(props) {
  return (
    <div>
        {/* <div className='main-bg' style={{backgroundImage: 'URL('+bg+')'}}></div> */}
        {/* <img className='main-bg' src={bg}></img> */}
        <img className='main-bg' src={process.env.PUBLIC_URL + '/img/vineyards.jpg'}/>

        <Container>
          <Row>
            {
              props.item.map((element, idx)=>{
                return (
                  <Card element={element} idx={element.id} key={idx}></Card>
                  // <Col md={4} key={idx}>
                  //   <img src={process.env.PUBLIC_URL +'./img/item'+(idx+1)+'.jpg'} width='80%'/>
                  //   <h4>{element.title}</h4>
                  //   <p> {element.price}</p>
                  // </Col> 
                )
              })
            }


            
            {/* <Col md={4}>
              <img src={process.env.PUBLIC_URL + './img/item1.jpg'} width='80%'/>
              <h4>{item[0].title}</h4>
              <p>{item[0].price}</p>
            </Col>
            <Col md={4}>
              <img src={process.env.PUBLIC_URL + './img/item2.jpg'} width='80%'/>
              <h4>{item[1].title}</h4>
              <p>{item[1].price}</p>
            </Col>
            <Col md={4}>
              <img src={process.env.PUBLIC_URL + './img/item3.jpg'} width='80%'/>
              <h4>{item[2].title}</h4>
              <p>{item[2].price}</p>
            </Col> */}
          </Row>
          <button onClick={()=>{
            axios.get('/ajaxTest/ods1')
                      .then((result)=>{ // 데이터 수신이 성공적일 때 동작할 기능
                        // console.log(result.data);
                        props.setItem(result.data);
                      }).catch(()=>{    // 데이터 수신이 실패했을 때 동작할 기능
                        console.log('전송 실패');
                      })
          }}>가져오기</button>
          <button onClick={()=>{
          }}>보내기</button>
        </Container>
    </div>
  )
}

export default App;
