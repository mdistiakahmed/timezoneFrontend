import { useState } from 'react';
import AddButton from '../../common-components/AddButton';
import AddUserDialog from './AddUserDialog';
import Loader from '../../common-components/Loader';
import Toast from '../../common-components/Toast';
import Topbar from '../../common-components/Topbar';
import UserTable from './UserTable';
import { UserRoles } from '../../../constants/GeneralConstants';

const User = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  return (
    <div>
      <Topbar />

      <UserTable />
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
