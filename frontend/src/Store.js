import { createContext, useReducer } from 'react';

export const Store = createContext();

//Check local storage for user info/basket items , if it exsits parse it to json object
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  basket: {
    basketItems: localStorage.getItem('basketItems')
      ? JSON.parse(localStorage.getItem('basketItems'))
      : [],
    //if the payment method exists use it if not make it an empty string.
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'basket_add':
      // add to basket
      const newItem = action.payload;
      const existItem = state.basket.basketItems.find(
        (item) => item._id === newItem._id
      );
      const basketItems = existItem
        ? state.basket.basketItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.basket.basketItems, newItem];
      //Store items in basket locally so that when page is refreshed items persist
      localStorage.setItem('basketitems', JSON.stringify(basketItems));
      return {
        ...state,
        basket: { ...state.basket, basketItems: basketItems },
      };
    case 'basket_remove_item': {
      const basketItems = state.basket.basketItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('basketItems', JSON.stringify(basketItems));
      return { ...state, basket: { ...state.basket, basketItems } };
    }
    case 'clear_basket':
      return {
        ...state,
        basket: { ...state.basket, basketItems: basketItems },
      };
    case 'user_signin':
      return { ...state, userInfo: action.payload };
    case 'user_signout':
      return {
        ...state,
        userInfo: null,
        basket: {
          basketItems: [],
          postalAddress: {},
          paymentMethod: '',
        },
      };
    case 'save_delivery_address':
      return {
        ...state,
        basket: {
          ...state.basket,
          postalAddress: action.payload,
        },
      };
    case 'save_payment_info':
      return {
        ...state,
        basket: { ...state.basket, paymentMethod: action.payload },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
