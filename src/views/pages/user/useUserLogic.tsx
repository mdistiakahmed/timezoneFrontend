import { useContext, useEffect, useState } from 'react';
import UserServiceFunction from '../../../services/UserService';
import { UserDTO } from '../../../utils/DataModel';
import { ApplicationContext } from '../../../context/AppContext';
//import { PageLimit } from '../../../constants/GeneralConstants';

export interface UserInterface {
    userData: UserDTO[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
}

const useUserLogic = () => {
    const [userTableData, setUserTableData] = useState<UserInterface>({
        userData: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
    });
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    const { dispatch } = useContext(ApplicationContext);
    const userService = UserServiceFunction(dispatch);

    const setPageNumber = (pageNo: number) => {
        setUserTableData({
            ...userTableData,
            pageNumber: pageNo,
        });
    };

    const loadData = async () => {
        // set loader state = true
        userService
            .getAllUsers(userTableData.pageNumber, 10) //PageLimit.USER_PAGE_LIMIT
            .then((res) => {
                setUserTableData({
                    ...userTableData,
                    userData: res.userList,
                    pageSize: res.pageSize,
                    pageNumber: res.pageNo,
                    totalElements: res.totalElements,
                });
            });
    };

    // make seperate :  make delete and deleteAndLoad method
    const deleteData = async (username: string) => {
        userService.deleteUser(username).then(async (result) => {
            loadData();
        });
    };

    const createData = async (data: UserDTO) => {
        userService.createUser(data).then(async (result) => {
            loadData();
        });
    };

    const updateData = async (username: string, role: string) => {
        const isSysAdmin = role === 'admin';
        userService
            .updateUser({
                username: username,
                sysadmin: isSysAdmin,
                password: 'a',
            })
            .then(async (result) => {
                loadData();
            });
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userTableData.pageNumber]);

    return {
        loadData,
        deleteData,
        updateData,
        createData,
        setPageNumber,
        userTableData,
        createModalOpen,
        setCreateModalOpen,
    };
};

export default useUserLogic;
