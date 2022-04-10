import React, { useContext, useEffect, useState } from 'react'
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
    modalOpen: boolean;
    showLoader: boolean;
    showToast: boolean;
}

const useUserLogic = () => {

    const [userLogic, setUserLogic] = useState<UserInterface>({
        userData: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
        modalOpen: false,
        showLoader: false,
        showToast: false
    })
    // const [userData, setUserData] = useState<UserDTO[]>([]);
    // const [pageNumber, setPageNumber] = useState<number>(0);
    // const [pageSize, setPageSize] = useState<number>(0);
    // const [totalElements, setTotalElements] = useState<number>(0);

    // const [modalOpen, setModalOpen] = useState<boolean>(false);
    // const [showLoader, setShowLoader] = useState<boolean>(false);
    // const [showToast, setShowToast] = useState<boolean>(false);

    const navigate = useNavigate();
    const { state, dispatch } = useContext(ApplicationContext);
    const userService = UserServiceFunction(navigate, dispatch);

    const setPageNumber = (pageNo: number) => {
        setUserLogic({
            ...userLogic,
            pageNumber: pageNo
        })
    }

    const setShowToast = (toastValue: boolean) => {
        setUserLogic({
            ...userLogic,
            showToast: toastValue
        })
    }

    const setShowLoader = (loaderValue: boolean) => {
        setUserLogic({
            ...userLogic,
            showLoader: loaderValue
        })
    }

    const setModalOpen = (modalValue: boolean) => {
        setUserLogic({
            ...userLogic,
            modalOpen: modalValue
        })
    }

    const loadData = async () => {
        setShowLoader(true);
        try {
            await userService
                .getAllUsers(userLogic.pageNumber, PageLimit.USER_PAGE_LIMIT)
                .then((res) => {
                    setUserLogic({
                        ...userLogic,
                        userData: res.userList,
                        pageSize: res.pageSize,
                        pageNumber:res.pageNo,
                        totalElements: res.totalElements
                    })
                    // setUserData(res.userList);
                    // setPageSize(res.pageSize);
                    // setPageNumber(res.pageNo);
                    // setTotalElements(res.totalElements);
                });
        } finally {
            setShowLoader(false);
        }
    };

    const deleteUser = async (username: string) => {
      setShowLoader(true);
      await userService
          .deleteUser(username)
          .then(async (result) => {
              setShowToast(true);
              await loadData();
          });
      //setShowLoader(false);
  };

    useEffect(() => {
        loadData();
    }, [userLogic.pageNumber, state.alert]);

    return { 
        loadData, 
        deleteUser, 
        setShowToast,
        setPageNumber,
        userTableData: userLogic, 
        setModalOpen
     };
}

export default useUserLogic