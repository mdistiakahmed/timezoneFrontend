import { createContext } from 'react';

export const UserDataContext = createContext<PageManager | null>(null);

//TODO : update name of pageManager to meaningfull something
export type PageManager = {
    loadData: ()=>void;
    deleteUser: (username: string) => void;
}