import { NavigateFunction } from "react-router-dom";
import HttpErrorResponseModel from "../utils/HttpErrorResponseModel";

export class ErrorHandlerService {
    static async handleError(err:HttpErrorResponseModel, navigate: NavigateFunction): Promise<boolean> {
        let errorHandled = false;
        switch(err.status) {
            case 0: {
                errorHandled = true;
                navigate("/server-down");
                break;
            }
            default: {
                break;
            }
        }
        return Promise.resolve(errorHandled);
    }
}