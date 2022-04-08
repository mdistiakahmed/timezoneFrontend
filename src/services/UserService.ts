import { NavigateFunction } from 'react-router-dom';
import { ApiEndpoints } from '../constants/ApiEndpoints';
import HttpUtility from '../utils/HttpUtility';
import { ErrorHandlerService } from './CommonErrorHandlerService';

export class UserService {
  navigate: NavigateFunction;
  constructor(navigate: NavigateFunction) {
    this.navigate = navigate;
  }

  async loadUser(pageNo: number, pageSize: number): Promise<any> {
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
}
