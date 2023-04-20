import { combineReducers } from "redux";
import {getAllProduct,addProductToCart} from "./reducers";

const rootReducer = combineReducers({
    getAllProduct,addProductToCart
});

export default rootReducer;