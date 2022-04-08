import { useEffect, useState } from 'react';
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

const User = () => {
    const [userData, setUserData] = useState<UserDTO[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(false);

    const navigate = useNavigate();
    const userService = new UserService(navigate);

    const loadData = async () => {
        setShowLoader(true);
        console.log('i am going...');
        await userService
            .loadUser(pageNumber, PageLimit.USER_PAGE_LIMIT)
            .then((result) => {
                console.log('in then block');
                console.log(result);
                setUserData(result.userList);
                setPageNumber(result.pageNo);
                setPageSize(result.pageSize);
                setTotalElements(result.totalElements);
            });
        setShowLoader(false);
    };

    useEffect(() => {
        loadData();
    }, [pageNumber]);

    return (
        <UserDataContext.Provider value={{ loadData }}>
            <div>
                <Topbar />
                <Loader isLoading={showLoader} />

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
