import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserServiceFunction from '../../../services/UserService';
import { UserDTO } from '../../../utils/DataModel';
import { ApplicationContext } from '../../../context/AppContext';
import { PageLimit } from '../../../constants/GeneralConstants';


interface UserInterface {
    userData: UserDTO[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
}

const useUserLogic = () => {

    const [userLogic, setUserLogic] = useState<UserInterface>({
        userData: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
    })

    const navigate = useNavigate();
    const { state, dispatch } = useContext(ApplicationContext);
    const userService = UserServiceFunction(navigate, dispatch);

    const setPageNumber = (pageNo: number) => {
        setUserLogic({
            ...userLogic,
            pageNumber: pageNo
        })
    }



    const loadData = async () => {
        await userService
            .getAllUsers(userLogic.pageNumber, PageLimit.USER_PAGE_LIMIT)
            .then((res) => {
                setUserLogic({
                    ...userLogic,
                    userData: res.userList,
                    pageSize: res.pageSize,
                    pageNumber: res.pageNo,
                    totalElements: res.totalElements,
                });
            });
    };

    const deleteUser = async (username: string) => {
      await userService
          .deleteUser(username)
          .then(async (result) => {
              await loadData();
          });
  };

    useEffect(() => {
        loadData();
    }, [userLogic.pageNumber, state.alert]);

    return { 
        loadData, 
        deleteUser, 
        setPageNumber,
        userTableData: userLogic, 
     };
}

export default useUserLogic