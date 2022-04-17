import { useEffect, useState } from 'react';
import {
    TimeZoneDataModel,
    TimeZoneTableDataModel,
} from '../../../constants/DataModel';
import useTimeZoneService from '../../../services/useTimeZoneService';

const useTimeZoneData = () => {
    const timeZoneService = useTimeZoneService();
    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
    const [timeZoneTableData, setTimeZoneTableData] =
        useState<TimeZoneTableDataModel>({
            timeZoneDataModelList: [],
            pageNumber: 0,
            pageSize: 0,
            totalElements: 0,
        });

    const setPageNumber = (pageNo: number) => {
        setTimeZoneTableData({
            ...timeZoneTableData,
            pageNumber: pageNo,
        });
    };

    const loadTimeZoneData = async (): Promise<any> => {
        timeZoneService
            .getTimeZone(timeZoneTableData.pageNumber, 4) //PageLimit.USER_PAGE_LIMIT
            .then((res) => {
                setTimeZoneTableData({
                    ...timeZoneTableData,
                    timeZoneDataModelList: res.timeZoneDataModelList,
                    pageSize: res.pageSize,
                    pageNumber: res.pageNo,
                    totalElements: res.totalElements,
                });
                return Promise.resolve(res);
            });
    };

    const createTimeZone = async (data: TimeZoneDataModel): Promise<any> => {
        return timeZoneService
            .createTimeZone(data)
            .then(async (result) => {
                loadTimeZoneData();
                return Promise.resolve();
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };

    useEffect(() => {
        console.log('In Load timezone data use effect');
        loadTimeZoneData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeZoneTableData.pageNumber]);

    return {
        timeZoneTableData,
        loadTimeZoneData,
        createTimeZone,
        setPageNumber,
        addModalOpen,
        setAddModalOpen,
    };
};

export default useTimeZoneData;
