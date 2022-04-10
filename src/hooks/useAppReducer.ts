import { useReducer } from 'react';

// An enum with all the types of actions to use in our reducer
export enum AppReducerActionKind {
    SET_ALERT,
    GET_USER_TOKEN,
    SET_TOKEN,
    REMOVE_TOKEN,
    ERROR
}

// An interface for our actions
export type AppReducerAction = {
    type: AppReducerActionKind;
    payload?: string;
}

// An interface for our state
export type AppState = {
    alert: string;
    token: string;
}

const initialState: AppState = {
    alert: '',
    token: '',
};

const getUserTokenApi = async(userId: string) => {
     // const resp = await axios.get(base_url, {})
     // return resp.json();
}

const appReducerFunction = (state: AppState, action: AppReducerAction) => {
    const { type, payload } = action;
    console.log("In appReducerFunction: ", type, payload);
    switch (type) {
        // user actions
        // case AppReducerActionKind.GET_USER_TOKEN:
        //     const ans_string = getUserTokenApi(payload?.toString() ?? '');
        //     return {
        //         ...state,
        //         token: ans_string,
        //     }
        case AppReducerActionKind.ERROR:
            console.log("Dispatched .... ");
            console.log("Action Payload: ", payload);
            return {
                ...state,
                alert: payload ?? 'Unknown Error'
            }
        default:
            console.error('No reducer found for action: ', action);
            return state;
    }
};

export const useAppReducer = () => {
    const [state, dispatch] = useReducer(appReducerFunction, initialState);

    return { state, dispatch };
};
