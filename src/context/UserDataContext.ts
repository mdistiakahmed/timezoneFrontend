import { createContext } from 'react';
import { UserDTO } from '../utils/DataModel';
import { UserInterface } from '../views/pages/user/useUserData';

export const UserDataContext = createContext<UserDataContextType>({
    userTableData: {
        userData: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
    },
    loadData: () => {},
    deleteData: () => {},
    updateData: () => {},
    createData: () => {},
    setPageNumber: () => {},
});

export type UserDataContextType = {
    userTableData: UserInterface;
    loadData: () => any;
    deleteData: (username: string) => any;
    updateData: (username: string, role: string) => void;
    createData: (data: UserDTO) => void;
    setPageNumber: (pageNo: number) => void;
};
