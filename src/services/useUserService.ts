import { useContext } from 'react';
import { ApiEndpoints } from '../constants/ApiEndpoints';
import { ApplicationContext } from '../context/AppContext';
import { UserDTO } from '../constants/DataModel';
import { AppReducerActionKind } from '../hooks/useAppReducer';
import HttpErrorHandler from '../utils/HttpErrorHandler';

const useUserService = () => {
    const { apiHandler, dispatch } = useContext(ApplicationContext);

    const getAllUsers = async (
        pageNo: number,
        pageSize: number,
    ): Promise<UserDataResponseModel> => {
        setLoader(true);
        return apiHandler
            ._get(ApiEndpoints.user.getUsers, {
                params: { pageNo: pageNo, pageSize: pageSize },
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const createUser = async (data: UserDTO): Promise<any> => {
        setLoader(true);
        return apiHandler
            ._post(ApiEndpoints.user.createUser, data)
            .then(() => {
                setMessage('User Created');
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const deleteUser = async (username: string): Promise<any> => {
        setLoader(true);
        return apiHandler
            ._delete(ApiEndpoints.user.deleteUser(username))
            .then((res: any) => {
                setMessage('Deleted');
                return Promise.resolve(res);
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const updateUser = async (data: UserDTO): Promise<any> => {
        setLoader(true);
        return apiHandler
            ._put(ApiEndpoints.user.updateUser, data)
            .then((res: any) => {
                setMessage('Updated');
                return Promise.resolve(res);
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const setLoader = (value: boolean) => {
        dispatch({
            type: AppReducerActionKind.SET_LOADER,
            payload: value,
        });
    };

    const setMessage = (value: string) => {
        dispatch({
            type: AppReducerActionKind.SET_ALERT,
            payload: { msg: value, type: 'success' },
        });
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