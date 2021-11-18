import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../reducers/userReducer';
// import rootReducer from '../reducers'
export const store = configureStore({
    reducer: {
        user: userReducer
    },
});

// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { userReducer } from "../reducers/userReducer";

// const reducer = combineReducers({
//     user: userReducer
// })

// let initialState = {
//     user: {}
// }

// const middleware = [thunk];

// export const store = createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// );
