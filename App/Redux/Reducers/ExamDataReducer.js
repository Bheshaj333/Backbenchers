import { SET_EXAM_DATA } from '../Actions/Actions';

const initialState = {
    examData: null,
};

const examDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXAM_DATA:
            return {
                examData: action.payload,
            };
        default:
            return state;
    }
};

export default examDataReducer;