import { createContext } from 'react';
import { UserInterface } from '../views/pages/user/useUserLogic';

export const UserDataContext = createContext<UserDataContextType>({
    userTableData: {userData:[], pageNumber: 0, pageSize: 0, totalElements: 0},
    loadData: () => {},
    deleteData: () => {},
    updateData: () => {},
    setPageNumber: ()=>{},
});

export type UserDataContextType = {
    userTableData: UserInterface;
    loadData: () => any;
    deleteData: (username: string) => any;
    updateData: (username:string, role: string) => void;
    setPageNumber: (pageNo: number) => void;
};
