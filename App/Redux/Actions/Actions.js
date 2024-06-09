export const SET_MOCK_TEST_DATA = 'SET_MOCK_TEST_DATA';
export const SET_EXAM_DATA = 'SET_EXAM_DATA';

export const setMockTestData = (data) => ({
    type: SET_MOCK_TEST_DATA,
    payload: data,
});

export const setExamData = (data) => ({
    type: SET_EXAM_DATA,
    payload: data,
});
