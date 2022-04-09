import { useReducer } from 'react';

// An enum with all the types of actions to use in our reducer
enum AppReducerActionKind {
    SET_ALERT = 'set_alert',
    SET_TOKEN = 'set_token',
    REMOVE_TOKEN = 'remove_token',
}

// An interface for our actions
export type AppReducerAction = {
    type: AppReducerActionKind;
    payload: string;
}

// An interface for our state
export type AppState = {
    alert: string;
    token: string;
}

const initialState = {
    alert: '',
    token: '',
};

const appReducerFunction = (state: AppState, action: AppReducerAction) => {
    const { type, payload } = action;
    switch (type) {
        // user actions
        default:
            console.error('No reducer found for action: ', action);
            return state;
    }
};

export const useAppReducer = () => {
    const [state, dispatch] = useReducer(appReducerFunction, initialState);

    return { state, dispatch };
};
