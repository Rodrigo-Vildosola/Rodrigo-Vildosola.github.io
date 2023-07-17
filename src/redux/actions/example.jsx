
import Axios from 'axios';
import { types, API_URL } from "./types";


export const exampleAction = () =>
{
    return async (dispatch) =>
    {
        const response = await fetch(`${API_URL}/api/`);
        const data = await response.json();
        dispatch({
            type: types.setExampleAction,
            payload: data,
            message: 'Example Action',
        });
    };
}

export const exampleActionAxios = () => 
{
    return async (dispatch) =>
    {
        const response = await Axios.get(`${API_URL}/api/`);
        dispatch({
            type: types.setExampleActionAxios,
            payload: response.data,
            message: 'Example Action',
        });
    };
}