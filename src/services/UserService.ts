import { NavigateFunction } from 'react-router-dom';
import { ApiEndpoints } from '../constants/ApiEndpoints';
import { UserDTO } from '../utils/DataModel';
import HttpUtility from '../utils/HttpUtility';
import meAxios from '../utils/meAxios';
import { ErrorHandlerService } from './CommonErrorHandlerService';


export class UserService {
  navigate: NavigateFunction;
  constructor(navigate: NavigateFunction) {
    this.navigate = navigate;
  }

  async loadUser(pageNo: number, pageSize: number): Promise<any> {
    console.log(ApiEndpoints.user.deleteUser('abc'));
    return new Promise(async (resolve, reject) => {
      await HttpUtility.get(ApiEndpoints.user.getUsers, {pageNo: pageNo, pageSize: pageSize})
        .then((res) => {
            return resolve(res);
        })
        .catch((err) => {
          ErrorHandlerService.handleError(err, this.navigate);
          return reject(err);
        });
    });
  }

  getAllUsers = async (pageNo: number, pageSize: number):Promise<UserDataResponseModel> => {
    console.log(process.env.REACT_APP_SERVER_URL);
    return meAxios.get(ApiEndpoints.user.getUsers,{params: {pageNo: pageNo, pageSize: pageSize}})
      .then(res => Promise.resolve(res.data));
  }

  _delay(duration = 250) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  async deleteUser(username: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await HttpUtility.delete(ApiEndpoints.user.deleteUser(username), null)
        .then((res) => {
            return resolve(res);
        })
        .catch((err) => {
          ErrorHandlerService.handleError(err, this.navigate);
          return reject(err);
        });
    });
  }
}

export type UserDataResponseModel = {
  last: boolean,
  pageNo: number,
  pageSize: number,
  totalElements: number,
  totalPages: number,
  userList: UserDTO[]
}
