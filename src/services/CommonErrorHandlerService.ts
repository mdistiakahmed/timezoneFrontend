import { NavigateFunction } from "react-router-dom";
import HttpErrorResponseModel from "../utils/HttpErrorResponseModel";

export class ErrorHandlerService {
    static handleError(err:HttpErrorResponseModel, navigate: NavigateFunction) {
        switch(err.status) {
            case 0:
                navigate("/server-down");
                break;
            default:
                break;
        }

    }
}