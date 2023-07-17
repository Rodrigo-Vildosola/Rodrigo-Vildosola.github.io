import { types } from "../actions/types";

export const exampleReducer = (state = { getRequest: null, getRequestAxios: null }, action) =>
{
    switch (action.type)
    {
        case types.setExampleActionAxios:
            return {
                ...state,
                getRequestAxios: {
                    data: action.payload,
                    time: new Date().getTime(),
                    status: action.status,
                    message: action.message
                }
            };

        case types.setExampleAction:
            return {
                ...state,
                getRequest: {
                    data: action.payload,
                    time: new Date().getTime(),
                    status: action.status,
                    message: action.message
                }
            };




        default:
            return state;
    }
};
