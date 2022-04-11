import Topbar from '../../common-components/Topbar';
import UserTable from './UserTable';
import useUserLogic from './useUserLogic';

import { UserRoles } from '../../../constants/GeneralConstants';
import { UserDataContext } from '../../../context/UserDataContext';

const User = () => {
    const { loadData, deleteUser, userTableData, setPageNumber } = useUserLogic();
    const { userData, pageNumber, pageSize, totalElements } = userTableData;

    return (
        <UserDataContext.Provider value={{ loadData, deleteUser }}>
            <div>
                <Topbar />
                <UserTable
                    data={userData}
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    totalElements={totalElements}
                    setPageNumber={(pageNo: number) => setPageNumber(pageNo)}
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
