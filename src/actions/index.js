import { LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../constants/userConstants";
import { emailRequest, getUserProfile, logoutUser, signupUser } from "../utils/Authentication";

// login action
export const login = (email, token) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        let obj = {
            email,
            token
        }
        const { results } = await emailRequest(obj)
        let payload = {
            email,
            results
        }
        dispatch({ type: LOGIN_SUCCESS, payload: payload });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.message });
    }
};

// signup action
export const registerUser = (obj) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const { results } = await signupUser(obj)
        let payload = {
            data: results.user,
        }
        dispatch({ type: REGISTER_USER_SUCCESS, payload: payload });
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.message });
    }
};

// laad user

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const referal = localStorage.getItem("referalToken")

        const { results } = await getUserProfile(referal);

        dispatch({ type: LOAD_USER_SUCCESS, payload: results });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.message });
    }
};

// logout action

export const logoutuser = (id) => async (dispatch) => {
    try {
        await logoutUser(id)

        window.location.replace('/login')

        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.message });
    }
};