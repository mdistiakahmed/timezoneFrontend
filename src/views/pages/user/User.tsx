import Topbar from '../../common-components/Topbar';
import UserTable from './Table/UserTable';
import useUserLogic from './useUserLogic';

import { UserRoles } from '../../../constants/GeneralConstants';
import { UserDataContext } from '../../../context/UserDataContext';
import AddButton from '../../common-components/AddButton';
import UserCreateDialog from './Modals/CreateModal/UserCreateDialog';

const User = () => {
    const {
        userTableData,
        loadData,
        deleteData,
        updateData,
        createData,
        setPageNumber,
        createModalOpen,
        setCreateModalOpen,
    } = useUserLogic();

    return (
        <UserDataContext.Provider
            value={{
                userTableData,
                loadData,
                deleteData,
                updateData,
                createData,
                setPageNumber,
            }}
        >
            <div>
                <Topbar />
                <UserTable />
                <AddButton
                    title="Add New User"
                    onClick={() => setCreateModalOpen(true)}
                />
                <UserCreateDialog
                    isOpen={createModalOpen}
                    onCancel={() => setCreateModalOpen(false)}
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
