import { useState } from 'react';
import AddButton from '../components/AddButton';
import AddUserDialog from '../components/AddUserDialog';
import Topbar from '../components/Topbar';
import UserTable from '../components/UserTable';

const User = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
    </div>
  );
};

export default User;

export type UserData = {
  email: string;
  password?: string;
  role: UserRoles;
};

export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
}
