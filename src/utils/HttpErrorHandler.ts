import { AppReducerActionKind } from '../hooks/useAppReducer';

const HttpErrorHandler = (error: any, dispatch: any) => {
    let errorMessage = '';
    if (error.response) {
        // The client was given an error response (5xx, 4xx)
        if (error.response.status === 400) {
            errorMessage = 'Bad Request. ' + error.response.data?.msg;
        } else if (error.response.status === 401) {
            errorMessage = 'Unauthorized.' + error.response.data?.msg;
        } else if (error.response.status === 403) {
            errorMessage = 'Access Denied. ' + error.response.data?.msg;
        } else if (error.response.status === 404) {
            errorMessage = 'Page not found. ' + error.response.data?.msg;
        } else if (error.response.status === 409) {
            errorMessage = 'Conflict. ' + error.response.data?.msg;
        } else {
            errorMessage = 'Error... ' + error.message;
        }
    } else if (error.request) {
        // The client never received a response, and the request was never left
        errorMessage = 'Server is not responding, try again';
    } else {
        // Anything else
        errorMessage =
            'Something went wrong. Try agian. Details: ' + error.message;
    }
    dispatch({
        type: AppReducerActionKind.ALERT,
        payload: { msg: errorMessage },
    });
};

export default HttpErrorHandler;
