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

    const { dispatch } = useContext(ApplicationContext);
    const userService = UserServiceFunction(dispatch);

    const setPageNumber = (pageNo: number) => {
        setUserTableData({
            ...userTableData,
            pageNumber: pageNo,
        });
    };

    const loadData = async () => {
        await userService
            .getAllUsers(userTableData.pageNumber, 1) //PageLimit.USER_PAGE_LIMIT
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
        await userService.deleteUser(username).then(async (result) => {
            await loadData();
        });
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userTableData.pageNumber]);

    return {
        loadData,
        deleteData,
        setPageNumber,
        userTableData: userTableData,
    };
};

export default useUserLogic;
