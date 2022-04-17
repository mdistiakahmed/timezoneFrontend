import { createContext } from 'react';
import {
    TimeZoneDataModel,
    TimeZoneTableDataModel,
} from '../constants/DataModel';

export const TimeZoneDataContext = createContext<TimeZoneDataContextType>({
    timeZoneTableData: {
        timeZoneDataModelList: [],
        pageNumber: 0,
        pageSize: 0,
        totalElements: 0,
    },
    loadTimeZoneData: () => {
        return Promise.resolve();
    },
    createTimeZone: () => {
        return Promise.resolve();
    },
    setPageNumber: () => {},
    addModalOpen: false,
    setAddModalOpen: () => {},
});

export type TimeZoneDataContextType = {
    timeZoneTableData: TimeZoneTableDataModel;
    loadTimeZoneData: () => Promise<any>;
    createTimeZone: (data: TimeZoneDataModel) => Promise<void>;
    setPageNumber: (pageNo: number) => void;
    addModalOpen: boolean;
    setAddModalOpen: any;
};
