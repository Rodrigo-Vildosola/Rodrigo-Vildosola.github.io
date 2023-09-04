import { types } from "../actions/types";

const initialState = {
    getTemplates: {},
    updateTemplate: {},
    createTemplate: {},
    deleteTemplate: {},
};

export const templatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.setGetTemplates:
            return {
                ...state,
                getTemplates: {
                    status: action.payload.status,
                    data: action.payload.data,
                    time: new Date(),
                },
            };
        case types.setUpdateTemplate:
            return {
                ...state,
                updateTemplate: {
                    status: action.payload.status,
                    message: action.payload.message,
                    data: action.payload.data,
                    time: action.payload.time,
                },
            };
        case types.setCreateTemplate:
            return {
                ...state,
                createTemplate: {
                    status: action.payload.status,
                    message: action.payload.message,
                    data: action.payload.data,
                    time: action.payload.time,
                },
            };
        case types.setDeleteTemplate:
            return {
                ...state,
                deleteTemplate: {
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

export default templatesReducer;
