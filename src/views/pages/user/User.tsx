import React from 'react'
import AddButton from '../../common-components/AddButton';
import AddUserDialog from './AddUserDialog';
import Loader from '../../common-components/Loader';
import Toast from '../../common-components/Toast';
import Topbar from '../../common-components/Topbar';
import UserTable from './UserTable';
import useUserLogic from './useUserLogic';

import { UserRoles } from '../../../constants/GeneralConstants';
import { UserDataContext } from '../../../context/UserDataContext';

const User = () => {
    const { loadData, deleteUser, setShowToast, userTableData, setPageNumber, setModalOpen } = useUserLogic();
    const { userData, pageNumber, pageSize, totalElements, showToast, showLoader, modalOpen } = userTableData;

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
