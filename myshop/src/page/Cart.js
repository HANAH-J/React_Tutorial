import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, changeName2, increaseAge } from '../store';
import { addCount } from '../store/basket';

function Cart() {

    let a = useSelector((state)=>{  // 공용 저장소에 있는 모든 슬라이스를 가져오세요.
                return state;
                // 특정 슬라이스만 필요한 경우
                // return state.stock;
            });
    console.log(a);
    // console.log(a.userInfo);

    // 슬라이스를 변경하기 위한 함수 사용방법
    // 함수 실행을 요청하기 위한 기능
    let dispatch = useDispatch();  // 공용저장소에 요청을 보내주는 함수

    // 미니과제 : 버튼을 하나 만들어서 홍길동씨의 나이를 1 증가하는 함수

    // 미니과제
    let basket = useSelector((state)=>{return state.basket});

    return(
        <div>
            <h2>
                {a.userInfo.name}({a.userInfo.age})의 장바구니
                <button onClick={()=>{
                    dispatch(changeName()); // 함수 실행을 요청하는 것
                }}>이름 변경</button>
                <button onClick={()=>{
                    dispatch(increaseAge(10));
                }}>나이증가</button>
            </h2>
            <p>쇼핑카트</p>
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경하기</th>
              </tr>
            </thead>
            <tbody>
                {
                    basket.map((item, idx)=>{
                        return(
                        <tr key={idx}>
                            <td>{idx}</td>
                            <td>{item.title}</td>
                            <td>{item.count}</td>
                            <td><button onClick={()=>{
                                dispatch(addCount(item.id));
                            }}> + </button></td>
                        </tr>
                        )
                    })
                }
            </tbody>
          </Table>
        </div>
    )
}

export default Cart;

    // 미니과제1 : 가상의 장바구니 상품정보를 만들어서 카트에 출력하는 코드
    // id: 0, title: '필통', count: 2
    // id: 2, title: '슬리퍼', count: 5

    // 미니과제2 : 변경하기 칸에 (+)버튼을 생성해서
    //            버튼을 누를 때마다 상품 개수가 1씩 증가하는 코드