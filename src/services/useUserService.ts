import { useContext } from 'react';
import { ApiEndpoints } from '../constants/ApiEndpoints';
import { ApplicationContext } from '../context/AppContext';
import { UserDTO } from '../constants/DataModel';

const useUserService = () => {
    const { apiHandler } = useContext(ApplicationContext);

    const getAllUsers = async (
        pageNo: number,
        pageSize: number,
    ): Promise<UserDataResponseModel> => {
        return apiHandler._get(ApiEndpoints.user.getUsers, {
            params: { pageNo: pageNo, pageSize: pageSize },
        });
    };

    const createUser = async (data: UserDTO): Promise<any> => {
        return apiHandler._post(ApiEndpoints.user.createUser, data);
    };

    const deleteUser = async (username: string): Promise<any> => {
        return apiHandler._delete(ApiEndpoints.user.deleteUser(username));
    };

    const updateUser = async (data: UserDTO): Promise<any> => {
        return apiHandler._put(ApiEndpoints.user.updateUser, data);
    };

    return { getAllUsers, deleteUser, updateUser, createUser };
};

export type UserDataResponseModel = {
    last: boolean;
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    userList: UserDTO[];
};

export default useUserService;
