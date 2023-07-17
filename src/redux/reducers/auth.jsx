import { types } from "../actions/types";

export const authReducer = (
    state = {
        token: null,
        status: null,
        message: null,
        signIn: null,
        signOut: null,
        changePassword: {},
        resetPassword: {},
        resetPasswordConfirm: {},
        editPermissions: {},
    },
    action
) =>
{
    switch (action.type)
    {
        case types.setSignIn:
            return {
                ...state,
                signIn: {
                    token: action.payload.token,
                    status: action.payload.status,
                    message: action.payload.message,
                },
                token: action.payload.token,
            };
        case types.signOut:
            return {
                ...state,
                signOut: true,
                token: null,
                status: action.payload.status,
                message: action.payload.message,
            };
        case types.setChangePassword:
            return {
                ...state,
                changePassword: {
                    data: action.payload.data,
                    status: action.payload.status,
                    message: action.payload.message,
                },
            };
        case types.setResetPassword:
            return {
                ...state,
                resetPassword: {
                    data: action.payload.data,
                    status: action.payload.status,
                    message: action.payload.message,
                },
            };
        case types.setResetPasswordConfirm:
            return {
                ...state,
                resetPasswordConfirm: {
                    data: action.payload.data,
                    status: action.payload.status,
                    message: action.payload.message,
                },
            };
        case types.setEditPermissions:
            return {
                ...state,
                editPermissions: {
                    data: action.payload.data,
                    status: action.payload.status,
                    message: action.payload.message,
                },
            };
        default:
            return state;
    }
};