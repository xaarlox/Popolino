import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
