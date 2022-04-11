import { NavigateFunction } from 'react-router-dom';
import { ApiEndpoints } from '../constants/ApiEndpoints';
import { UserDTO } from '../utils/DataModel';
import HttpUtility from '../utils/HttpUtility';
import AxiosHandler from '../utils/meAxios';
import { ErrorHandlerService } from './CommonErrorHandlerService';


const UserServiceFunction = (navigate: NavigateFunction, dispatch: any) => {
  const { meAxios } = AxiosHandler(dispatch);

  const getAllUsers = async (pageNo: number, pageSize: number):Promise<UserDataResponseModel> => {
    return meAxios.get(ApiEndpoints.user.getUsers,{params: {pageNo: pageNo, pageSize: pageSize}})
      .then(res => Promise.resolve(res.data));
  }

  const deleteUser = async(username: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      await HttpUtility.delete(ApiEndpoints.user.deleteUser(username), null)
        .then((res) => {
            return resolve(res);
        })
        .catch((err) => {
          ErrorHandlerService.handleError(err, navigate);
          return reject(err);
        });
    });
  }


  return { getAllUsers, deleteUser};
}

export type UserDataResponseModel = {
  last: boolean,
  pageNo: number,
  pageSize: number,
  totalElements: number,
  totalPages: number,
  userList: UserDTO[]
}


export default UserServiceFunction;