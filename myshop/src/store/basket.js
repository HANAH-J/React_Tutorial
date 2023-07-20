import { createSlice } from "@reduxjs/toolkit";

let basket = createSlice({
    name : 'basket',
    initialState : [
        {id: 0, title : '필통', count: 2},
        {id: 2, title : '슬리퍼', count: 5}
    ],
    reducers : {
        addCount(state, data){
            let idx = state.findIndex((item)=>{
                return item.id === data.payload;
            });
            state[idx].count += 1;
        }
    }
})

export let {addCount} = basket.actions;

export default basket;