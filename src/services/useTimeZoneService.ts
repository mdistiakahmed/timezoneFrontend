import { useContext } from 'react';
import { ApiEndpoints } from '../constants/ApiEndpoints';
import { TimeZoneDataModel } from '../constants/DataModel';
import { ApplicationContext } from '../context/AppContext';
import HttpErrorHandler from '../utils/HttpErrorHandler';
import useUtilService from './useUtilService';

const useTimeZoneService = () => {
    const { apiHandler, dispatch } = useContext(ApplicationContext);
    const { setLoader, setMessage } = useUtilService();

    const getTimeZone = async (
        pageNo: number,
        pageSize: number,
    ): Promise<any> => {
        setLoader(true);
        return apiHandler
            ._get(ApiEndpoints.timeZone.getUserTimeZone, {
                params: { pageNo: pageNo, pageSize: pageSize },
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    const createTimeZone = async (data: TimeZoneDataModel): Promise<any> => {
        setLoader(true);
        return apiHandler
            ._post(ApiEndpoints.timeZone.createTimeZone, data)
            .then(() => {
                setMessage('TimeZone Created');
            })
            .catch((error: any) => {
                HttpErrorHandler(error, dispatch);
                return Promise.reject(error);
            })
            .finally(() => {
                setLoader(false);
            });
    };

    return { createTimeZone, getTimeZone };
};

export default useTimeZoneService;
