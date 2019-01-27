import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import issueReducer from "./issueReducer";
import helperReducer from "./helperReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    issues: issueReducer,
    helpers: helperReducer,
    admin: adminReducer
});
