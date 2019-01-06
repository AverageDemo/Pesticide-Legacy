import { TEST_DISPATCH } from "./types";

// User registration
export const registerUser = userData => {
    return {
        type: TEST_DISPATCH,
        payload: userData
    };
};
