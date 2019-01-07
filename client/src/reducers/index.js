import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import issueReducer from "./issueReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    issues: issueReducer
});
