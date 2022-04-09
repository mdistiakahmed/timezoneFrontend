import { useContext, useEffect, useState } from 'react';
import AddButton from '../../common-components/AddButton';
import AddUserDialog from './AddUserDialog';
import Loader from '../../common-components/Loader';
import Toast from '../../common-components/Toast';
import Topbar from '../../common-components/Topbar';
import UserTable from './UserTable';
import { PageLimit, UserRoles } from '../../../constants/GeneralConstants';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../../services/UserService';
import { UserDTO } from '../../../utils/DataModel';
import { UserDataContext } from '../../../context/UserDataContext';
import { ApplicationContext } from '../../../context/AppContext';

const User = () => {
    const [userData, setUserData] = useState<UserDTO[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);

    const navigate = useNavigate();
    const userService = new UserService(navigate);

    const { state, dispatch } = useContext(ApplicationContext);
    console.log(state);

    const loadData = async () => {
        setShowLoader(true);
        try {
            await userService
                .getAllUsers(pageNumber, PageLimit.USER_PAGE_LIMIT)
                .then((res) => {
                    setUserData(res.userList);
                    setPageSize(res.pageSize);
                    setPageNumber(res.pageNo);
                    setTotalElements(res.totalElements);
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

    }, [pageNumber]);

    return (
        <UserDataContext.Provider value={{ loadData, deleteUser }}>
            <div>
                <Topbar />
                <Loader isLoading={showLoader} />
                <Toast message='Hi There' show={showToast} onClose={setShowToast}/>

                <UserTable
                    data={userData}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    totalElements={totalElements}
                    setPageNumber={(pageNo: number) => setPageNumber(pageNo)}
                />
                <AddButton onClick={() => setModalOpen(true)} />
                <AddUserDialog
                    title="Add User"
                    open={modalOpen}
                    onCancel={() => setModalOpen(false)}
                    onAdd={() => {}}
                    isEdit={false}
                />
            </div>
        </UserDataContext.Provider>
    );
};

export default User;

export type UserData = {
    email: string;
    password?: string;
    role: UserRoles;
};
