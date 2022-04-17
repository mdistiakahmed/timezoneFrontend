import { createContext } from 'react';
import { TimeZoneDataModel } from '../constants/DataModel';

export const TimeZoneDataContext = createContext<TimeZoneDataContextType>({
    createTimeZone: () => {
        return Promise.resolve();
    },
    addModalOpen: false,
    setAddModalOpen: () => {},
});

export type TimeZoneDataContextType = {
    createTimeZone: (data: TimeZoneDataModel) => Promise<void>;
    addModalOpen: boolean;
    setAddModalOpen: any;
};
