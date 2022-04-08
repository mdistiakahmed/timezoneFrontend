import { NavigateFunction } from "react-router-dom";
import { ApiEndpoints } from "../constants/ApiEndpoints";
import { UserDTO } from "../utils/DataModel";
import HttpUtility from "../utils/HttpUtility";
import { ErrorHandlerService } from "./CommonErrorHandlerService";

export class AuthService {
  navigate: NavigateFunction;
  constructor(navigate: NavigateFunction) {
    this.navigate = navigate;
  }

  async test() {
    await HttpUtility.get(ApiEndpoints.test.testGet, null).catch((err) => {
      ErrorHandlerService.handleError(err, this.navigate);
      Promise.reject(err);
    });
  }

  async signUp(userDto: UserDTO): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await HttpUtility.post(ApiEndpoints.auth.signUp, userDto)
        .then((res) => resolve(res))
        .catch((err) => {
          ErrorHandlerService.handleError(err, this.navigate);
          return reject(err);
        });
    });
  }

  async signIn(userDto: UserDTO): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await HttpUtility.post(ApiEndpoints.auth.signIn, userDto)
        .then((res) => resolve(res))
        .catch((err) => {
          ErrorHandlerService.handleError(err, this.navigate);
          return reject(err);
        });
    });
  }
}
