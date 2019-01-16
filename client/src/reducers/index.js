import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import issueReducer from "./issueReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    issues: issueReducer,
    categories: categoryReducer
});
