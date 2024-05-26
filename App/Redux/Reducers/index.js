import { combineReducers } from 'redux';
import mockTestReducer from './MockTestReducer';

const rootReducer = combineReducers({
    mockTest: mockTestReducer,
});

export default rootReducer;
