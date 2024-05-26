import { SET_MOCK_TEST_DATA } from '../Actions/Actions';

const initialState = {
    mockTestData: null,
};

const mockTestReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOCK_TEST_DATA:
            return {
                // ...state,
                mockTestData: action.payload,
            };
        default:
            return state;
    }
};

export default mockTestReducer;
