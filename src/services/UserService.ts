import { ApiEndpoints } from '../constants/ApiEndpoints';
import { UserDTO } from '../utils/DataModel';
import AxiosHandler from '../utils/meAxios';


const UserServiceFunction = (dispatch: any) => {
  const { meAxios } = AxiosHandler(dispatch);

  const getAllUsers = async (pageNo: number, pageSize: number):Promise<UserDataResponseModel> => {
    return meAxios.get(ApiEndpoints.user.getUsers,{params: {pageNo: pageNo, pageSize: pageSize}})
      .then(res => Promise.resolve(res.data));
  }

  const deleteUser = async(username: string): Promise<any> => {
    return meAxios.delete(ApiEndpoints.user.deleteUser(username))
      .then(res => Promise.resolve(res.data));
  }

  // Change param time both front and back-end
  const updateUser = async(data: UserDTO): Promise<any> => {
    return meAxios.put(ApiEndpoints.user.updateUser, data)
      .then(res => {
        console.log(res.data);
        Promise.resolve(res.data);
      });
  }


  return { getAllUsers, deleteUser, updateUser};
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