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

const User = () => {
  const [userData, setUserData] = useState<UserDTO[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const navigate = useNavigate();
  const userService = new UserService(navigate);

  const loadData = () => {
    userService
      .loadUser(pageNumber, PageLimit.USER_PAGE_LIMIT)
      .then((result) => {
        setUserData(result.userList);
        setPageNumber(result.pageNo);
        setPageSize(result.pageSize);
        setTotalElements(result.totalElements);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Topbar />

      <UserTable
        data={userData}
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalElements={totalElements}
      />
      <AddButton onClick={() => setModalOpen(true)} />
      <AddUserDialog
        title="Add User"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onAdd={() => {}}
        isEdit={false}
      />
      <Loader
        isLoading={showSpinner}
        setIsLoading={(e: boolean) => {
          setShowSpinner(e);
        }}
      />
      <Toast message="This is a toast" />
    </div>
  );
};

export default User;

export type UserData = {
  email: string;
  password?: string;
  role: UserRoles;
};
