import { types } from "../actions/types";

export const clientsReducer = (
    state = {
        getClients: {},
        createClient: {},
        updateClient: {},
        deleteClient: {},
        getFormatsByClient: {},
        createFormat: {},
        updateFormat: {},
        deleteFormat: {},


    },
    action
) =>
{
    switch (action.type)
    {
        case types.setGetClients:
            return {
                ...state,
                getClients: {
                    status: action.payload.status,
                    data: action.payload.data,
                    title: action.payload.title,
                    time: new Date(),
                },
            };
        case types.setCreateClient:
            return {
                ...state,
                createClient: {
                    status: action.payload.status,
                    data: action.payload.data,
                    title: action.payload.title,
                    time: new Date(),
                },
            };
        case types.setUpdateClient:
            return {
                ...state,

                updateClient: {
                    status: action.payload.status,
                    data: action.payload.data,
                    title: action.payload.title,
                    time: new Date(),
                },
            };
        case types.setDeleteClient:
            return {
                ...state,
                deleteClient: {
                    status: action.payload.status,
                    data: action.payload.data,
                    title: action.payload.title,
                    time: new Date(),
                },
            };

        case types.setGetFormatsByClient:
            return {
                ...state,
                getFormatsByClient: {
                    status: action.payload.status,
                    data: action.payload.data,
                    title: action.payload.title,
                    time: new Date(),
                },
            };
        case types.setCreateFormat:
            return {
                ...state,
                createFormat: {
                    status: action.payload.status,
                    data: action.payload.data,
                    title: action.payload.title,
                    time: new Date(),
                },
            };
        case types.setUpdateFormat:
            return {
                ...state,
                updateFormat: {
                    status: action.payload.status,
                    data: action.payload.data,
                    title: action.payload.title,
                    time: new Date(),
                },
            };
        case types.setDeleteFormat:
            return {
                ...state,
                deleteFormat: {
                    status: action.payload.status,
                    data: action.payload.data,
                    title: action.payload.title,
                    time: new Date(),
                },
            };

        default:
            return state;
    }
};