import Topbar from '../../common-components/Topbar';
import UserTable from './Table/UserTable';
import useUserLogic from './useUserLogic';

import { UserRoles } from '../../../constants/GeneralConstants';
import { UserDataContext } from '../../../context/UserDataContext';
import AddButton from '../../common-components/AddButton';

const User = () => {
    const { userTableData, loadData, deleteData, updateData, setPageNumber } =
        useUserLogic();

    return (
        <UserDataContext.Provider
            value={{
                userTableData,
                loadData,
                deleteData,
                updateData,
                setPageNumber,
            }}
        >
            <div>
                <Topbar />
                <UserTable />
                <AddButton />
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
