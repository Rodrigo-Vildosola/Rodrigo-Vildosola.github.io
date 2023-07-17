import { types } from "../actions/types";

export const notificationsReducer = (
    state = { notification: null },
    action
) =>
{
    switch (action.type)
    {
        case types.setNotification:
            return {
                ...state,
                notification: {
                    status: action.payload.status,
                    message: action.payload.message,
                    title: action.payload.title,
                },
            };
        default:
            return state;
    }
};
