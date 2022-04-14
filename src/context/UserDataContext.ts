import { createContext } from 'react';
import { UserDTO } from '../utils/DataModel';
import { UserInterface } from '../views/pages/user/useUserLogic';

export const UserDataContext = createContext<UserDataContextType>({
    userTableData: {userData:[], pageNumber: 0, pageSize: 0, totalElements: 0},
    loadData: () => {},
    deleteData: () => {},
    updateData: () => {},
    createData: () => {},
    setPageNumber: ()=>{},
    createModalOpen: false,
    setCreateModalOpen: () => {}
});

export type UserDataContextType = {
    userTableData: UserInterface;
    loadData: () => any;
    deleteData: (username: string) => any;
    updateData: (username:string, role: string) => void;
    createData: (data: UserDTO) => void;
    setPageNumber: (pageNo: number) => void;
    createModalOpen: boolean;
    setCreateModalOpen: any;
};
