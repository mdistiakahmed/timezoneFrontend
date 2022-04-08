import { createContext } from 'react';

export const UserDataContext = createContext<PageManager>({loadData: () => {}});

export type PageManager = {
    loadData: ()=>void;
}