import { useState } from 'react';
import { TimeZoneDataModel } from '../../../constants/DataModel';
import useTimeZoneService from '../../../services/useTimeZoneService';

const useTimeZoneData = () => {
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

    const timeZoneService = useTimeZoneService();

    const createTimeZone = async (data: TimeZoneDataModel): Promise<any> => {
        return timeZoneService
            .createTimeZone(data)
            .then(async (result) => {
                //loadData();
                return Promise.resolve();
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };

    return {
        createTimeZone,
        addModalOpen,
        setAddModalOpen,
    };
};

export default useTimeZoneData;
