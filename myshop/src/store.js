// Redux 기본 세팅
// 1. 공용 저장소 생성 : store.js
// 저장소 기본 코드
//     import { configureStore } from "@reduxjs/toolkit";
//     export default configureStore({
//         reducer:{}
//     })
// 2. 공용 저장소를 사용할 범위 지정 : index.js
// import { Provider } from 'react-redux';
// import store from './store.js';
//      <Provider store={store}>
//          <BrowserRouter>
//              <App />
//          </BrowserRouter>
//      </Provider>

import { configureStore, createSlice } from "@reduxjs/toolkit";
import basket from "./store/basket";

// 공통으로 사용할 스테이트
let userInfo = createSlice({        // useState와 유사한 기능 : 리덕스에서는 스테이트 하나를 슬라이스
                    name : 'name',
                    // initialState : 'hong',
                    // reducers : {    // 함수를 만든다.
                    //     changeName(){
                    //         return 'HongGilDong';   // 함수의 반환값으로 스테이트 값을 변경
                    //     },
                    //     changeName2(state){ // 첫 번째 매개값 : 기존에 저장된 값
                    //         return state + ' 길동';  // hong 길동
                    //     }
                    // }
                    initialState : {name : '홍', age : 28},
                    reducers : {
                        changeName(state){
                            // return {name : '홍길동', age : 28};
                            state.name = '홍길동';
                        },
                        increaseAge(state, a){  // 두 번째 매개값 : 파라미터
                            state.age += a.payload;
                                           // 화물, 택배 매개값을 전달한다.
                        }
                    }
                });
// 슬라이스의 데이터를 변경하는 방법
// - 슬라이스에 변경하기 위한 함수를 만들고
// - 변경이 필요할 때 store에 함수 작동을 요청한다.

// 함수 정보를 내보내 주어야 한다.
export let {changeName, changeName2, increaseAge} = userInfo.actions;

let stock = createSlice({
                name : 'stock',
                initialState : [10, 20, 30]
            })

// 미니과제
// let basket = createSlice({
//                 name : 'basket',
//                 initialState : [
//                     {id: 0, title : '필통', count: 2},
//                     {id: 2, title : '슬리퍼', count: 5}
//                 ],
//                 reducers : {
//                     addCount(state, data){
//                         let idx = state.findIndex((item)=>{
//                             return item.id === data.payload;
//                         });
//                         state[idx].count += 1;
//                     }
//                 }
//             })
// export let {addCount} = basket.actions; // 함수는 액션

export default configureStore({
    reducer:{
        userInfo : userInfo.reducer, // 슬라이스 내보내기
        stock : stock.reducer,
        basket : basket.reducer
    }
});