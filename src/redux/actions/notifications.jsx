import { types, API_URL } from "./types";

export const setNotification = (data) => ({
    type: types.setNotification,
    payload: data,
});