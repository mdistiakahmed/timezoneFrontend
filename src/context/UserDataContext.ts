import { createContext } from 'react';
import { UserDTO, UserInterface } from '../constants/DataModel';

export const UserDataContext = createContext<UserDataContextType>({
    userTableData: {
        userData: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
    },
    loadData: () => {
        return Promise.resolve();
    },
    deleteData: () => {
        return Promise.resolve();
    },
    updateData: () => {
        return Promise.resolve();
    },
    createData: () => {
        return Promise.resolve();
    },
    setPageNumber: () => {},
    createModalOpen: false,
    setCreateModalOpen: () => {},
});

export type UserDataContextType = {
    userTableData: UserInterface;
    loadData: () => Promise<any>;
    deleteData: (username: string) => Promise<any>;
    updateData: (username: string, role: string) => Promise<any>;
    createData: (data: UserDTO) => Promise<void>;
    setPageNumber: (pageNo: number) => void;
    createModalOpen: boolean;
    setCreateModalOpen: any;
};
