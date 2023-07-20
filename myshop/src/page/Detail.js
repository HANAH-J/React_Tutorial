import React, { useContext, useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import {Context} from './../App.js';

// 하나의 컴포넌트로서 동작
let YellowBtn = styled.button`
    background-color: ${props => props.bg};
    color:  ${props => props.bg === 'black' ? 'white' : 'blue'};
    padding: 20px;
`;
// 화면 상 style 태그에 끼워넣어져서 생성

function Detail(props) {

    let {id} = useParams();
    console.log(props.item);

    let {item} = useContext(Context);
    // 전달하는 데이터가 많다면 {이름1, 이름2, 이름3 ...}
    
    // useEffect(); // 함수형 컴포넌트에서 라이프사이클을 동작시키기 위한 함수
    let [cnt, setCnt] = useState(0);
    let [show, setShow] = useState(true);

    useEffect(()=>{
        console.log('마운트, 업데이트 될 때 실행');
    }); // mount 될 때, update 될 때 항상 실행하는 userEffect가 된다.

    useEffect(()=>{
        // 컴포넌트가 mount, update 될 때 실행
        // return이 동작되어서 화면 구성이 완료된 후 실행
        console.log('useEffect 실행');
    }, [cnt, id]); // cnt 값이 변경될 때 useEffect 실행

    useEffect(()=>{
        console.log('마운트 될 때만 실행');
    }, []); // [] 안에 아무 state나 변수가 없는 경우
            // 오로지 mount 될 때만 실행되는 useEffect

    useEffect(()=>{
        setTimeout(()=>{
            setShow(false);
        }, 5000)
    });

    // clean up function : useEffect에 작성된 코드가 동작되기 직전 먼저 동작되는 함수
    useEffect(()=>{
        console.log('useEffect 실행 후');
        let bomb = setTimeout(()=>{
                        console.log('5초 후에 폭발합니다.');
                    }, 5000)
        return(()=>{ // clean up function
            console.log('useEffect 실행 전');
            clearTimeout(bomb);
        })
    })

    useEffect(()=>{
        return(()=>{
            console.log('언마운트 될 때만 실행');
        })
    }, [])

    // useEffect에 대한 최종 정리
    // 1. useEffect( ()=> {} )                  : 재 렌더링 할 때마다 코드를 실행
    // 2. useEffect( ()=> {}, [] )              : 마운트 시 1회 코드 실행
    // 3. useEffect( ()=> {return()=>{}}, [])   : 언마운트 시 1회 코드 실행
    // 4. useEffect( ()=> {}, [변수] )          : 변수가 변경될 때마다 코드 실행

    let [inputData, setInputData] = useState('');

    useEffect(()=>{
        if(isNaN(inputData)){
            alert('숫자만 입력하세요.');
            setInputData('');
        }
    }, [inputData])
    
    return (
        <div>
            <YellowBtn bg='yellow'>스타일 버튼</YellowBtn>
            <YellowBtn bg={'black'}>스타일 버튼2</YellowBtn>
            <br/>
            {cnt}
            <button onClick={()=>{setCnt(cnt+1)}}>버튼</button><br/>
            {
                show?
                <div style={{backgroundColor: 'yellow', width: '30%', margin: '0 auto'}}>Box</div>
                : null
            }
            <br/>
            <input type='text' onChange={(e)=>{
                setInputData(e.target.value);
            }}></input>
             <br/>

            <Container>
                <Row>
                    <Col>
                        <img src={process.env.PUBLIC_URL +'../img/item'+(Number(item[id].id)+1)+'.jpg'} width='80%'/>
                    </Col>
                    <Col>
                        <h4>{item[id].title}</h4>
                        <p>{item[id].content}</p>
                        <p>{item[id].price}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

class Detail2 extends React.Component {
    // 컴포넌트를 생성하는 구 방식
    // 컴포넌트의 라이프사이클에 맞는 함수를 생성

    componentDidMount() {
        // 컴포넌트가 mount될 때 실행될 코드
    }
    componentDidUpdate() {
        // 컴포넌트가 update될 때 실행될 코드
    }
    componentWillUnmount() {
        // 컴포넌트가 unmount될 때 실행될 코드
    }
}

export default Detail;