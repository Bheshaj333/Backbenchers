import { combineReducers } from 'redux';
import mockTestReducer from './MockTestReducer';
import examDataReducer from "./ExamDataReducer";

const rootReducer = combineReducers({
    mockTest: mockTestReducer,
    exam: examDataReducer,
});

export default rootReducer;
