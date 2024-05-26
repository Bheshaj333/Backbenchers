import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./Reducers"; // Adjust the path if necessary

const store = configureStore({
    reducer: rootReducer
});
export default store;
