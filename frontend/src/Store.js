import { createContext, useReducer } from "react";

export const Store = createContext()


const initialState = {
    cart: {
        cartItems: []
    }
}

function reducer(state,action){
    switch(action.type){
        case 'CART_ADD_ITEM':
            const newItem = action.payload
            const existingItem = state.cart.cartItems.find((item)=> item._id === newItem._id)
            const cartItems = existingItem ? state.cart.cartItems.map((item)=>item._id === existingItem._id ? newItem : item)
            : [...state.cart.cartItems,newItem]
            localStorage.setItem("cartItems",JSON.stringify(cartItems))
            return {...state,cart:{...state.cart,cartItems}}
            case 'CLEAR_CART':{
                return{...state,cart:{...state.cart,cartItems:[]}}
            }
            case 'CART_REMOVE_ITEM':{                
                const cartItems = state.cart.cartItems.filter((item)=>item._id !== action.payload._id)
                localStorage.setItem("cartItems",JSON.stringify(cartItems))
                return{...state,cart:{...state.cart,cartItems}}
            }
            default: 
            return state
    }
}


const userInitialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

function userReducer(state, action) {
    switch (action.type) {
        case 'USER_SIGNIN':
            return { ...state, userInfo: action.payload }
            case 'USER_LOGOUT':
                return {...state,userInfo:null}
        default:
            return state
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [state3, dispatch3] = useReducer(userReducer, userInitialState);

    const value = { state, dispatch ,state3, dispatch3, }
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}