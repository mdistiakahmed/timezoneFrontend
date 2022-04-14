import Topbar from '../../common-components/Topbar';
import UserTable from './Table/UserTable';
import useUserLogic from './useUserLogic';

import { UserRoles } from '../../../constants/GeneralConstants';
import { UserDataContext } from '../../../context/UserDataContext';
import AddButton from '../../common-components/AddButton';
import UserCreateDialog from './Modals/CreateModal';

const User = () => {
    const userLogic = useUserLogic();

    return (
        <UserDataContext.Provider value={userLogic}>
            <div>
                <Topbar />
                <UserTable />
                <AddButton
                    title="Add New User"
                    onClick={() => userLogic.setCreateModalOpen(true)}
                />
                <UserCreateDialog
                    isOpen={userLogic.createModalOpen}
                    onCancel={() => userLogic.setCreateModalOpen(false)}
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
