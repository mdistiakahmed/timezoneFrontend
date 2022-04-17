import { useContext } from 'react';
import { ApiEndpoints } from '../constants/ApiEndpoints';
import { TimeZoneDataModel } from '../constants/DataModel';
import { ApplicationContext } from '../context/AppContext';
import HttpErrorHandler from '../utils/HttpErrorHandler';
import useUtilService from './useUtilService';

const useTimeZoneService = () => {
    const { apiHandler, dispatch } = useContext(ApplicationContext);
    const { setLoader, setMessage } = useUtilService();

    const createTimeZone = async (data: TimeZoneDataModel): Promise<any> => {
        console.log('IN service class....');
        console.log(data);
        console.log('End service class...');
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

    return { createTimeZone };
};

export default useTimeZoneService;
