import { types } from "../actions/types";

const initialState = {
    getQuestions: {},
    updateQuestion: {},
    createQuestion: {},
    deleteQuestion: {},
};

export const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.setGetQuestions:
            return {
                ...state,
                getQuestions: {
                    status: action.payload.status,
                    data: action.payload.data,
                    time: new Date(),
                },
            };
        case types.setUpdateQuestion:
            return {
                ...state,
                updateQuestion: {
                    status: action.payload.status,
                    message: action.payload.message,
                    data: action.payload.data,
                    time: action.payload.time,
                },
            };
        case types.setCreateQuestion:
            return {
                ...state,
                createQuestion: {
                    status: action.payload.status,
                    message: action.payload.message,
                    data: action.payload.data,
                    time: action.payload.time,
                },
            };
        case types.setDeleteQuestion:
            return {
                ...state,
                deleteQuestion: {
                    status: action.payload.status,
                    message: action.payload.message,
                    data: action.payload.data,
                    time: action.payload.time,
                },
            };
        default:
            return state;
    }
};

export default questionsReducer;
