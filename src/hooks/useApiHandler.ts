import HttpClient from '../utils/HttpClient';

export const useApiHandler = (dispatch: any) => {
    const { api } = HttpClient(dispatch);

    const _get = async (url: string, param: any): Promise<any> => {
        const res = await api.get(url, { params: { ...param } });
        return await Promise.resolve(res.data);
    };

    const _post = async (url: string, data: any): Promise<any> => {
        const res = await api.post(url, data);
        return await Promise.resolve(res.data);
    };

    const _put = async (url: string, data: any): Promise<any> => {
        const res = await api.put(url, data);
        return await Promise.resolve(res.data);
    };

    const _delete = async (url: string): Promise<any> => {
        const res = await api.delete(url);
        return await Promise.resolve(res.data);
    };

    return { _get, _post, _put, _delete };
};
