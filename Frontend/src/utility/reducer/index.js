import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import testReducer from "./testReducer";
import adminReducer from "./adminReducer"
const rootReducer= combineReducers({
    user:userReducer,
    test:testReducer,
    admin:adminReducer
})

export default rootReducer