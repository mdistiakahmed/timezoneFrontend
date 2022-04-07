import { NavigateFunction } from "react-router-dom";
import { ApiEndpoints } from "../constants/ApiEndpoints";
import HttpUtility from "../utils/HttpUtility";
import { AuthorizationData } from "../views/pages/signup/Signup";
import { ErrorHandlerService } from "./CommonErrorHandlerService";

export class AuthService {
    navigate: NavigateFunction;
    constructor(navigate: NavigateFunction) {
        this.navigate = navigate;
    }
    
    async test() {
        await HttpUtility.get(ApiEndpoints.test.testGet,null)
        .then(res => console.log(res))
        .catch(err => {
            ErrorHandlerService.handleError(err, this.navigate);
            console.log(err);
        })
    }

    async createUser(userData: AuthorizationData) {
        await HttpUtility.post(ApiEndpoints.user.createUser,userData)
        .then(res => console.log(res))
        .catch(err => {
            ErrorHandlerService.handleError(err, this.navigate);
            console.log(err);
        })
    }
}
