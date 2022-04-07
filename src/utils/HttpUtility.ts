import axios, { Method } from 'axios';
import HttpErrorResponseModel from './HttpErrorResponseModel';

const RequestMethod = {
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
  Delete: 'DELETE',
  Options: 'OPTIONS',
  Head: 'HEAD',
  Patch: 'PATCH',
};

export default class HttpUtility {
  static async get(endpoint: string, data: any) {
    const config = data ? { data } : undefined;
    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Get as Method,
      },
      config,
    );
  }

  static async post(endpoint: string, data: any) {
    const config = data ? { data } : undefined;
    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Post as Method,
      },
      config,
    );
  }

  static async _request(restRequest: RestRequest, config: any) {
    const axiosRequestConfig = {
      data: config.data,
      method: restRequest.method,
      url: restRequest.url,
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return new Promise((resolve, reject) => {
      axios(axiosRequestConfig)
        .then((res) => {
          const result = res.data;
          resolve(result);
        })
        .catch((err) => {
          if (err.response) {
            console.log('Hello friends.....');
            console.log(err.response);
            reject(
              HttpUtility._fillInErrorWithDefaults({
                status: err.response.status,
                message: err.response.data ? err.response.data.msg: '',
                code: err.response.error ? err.response.error.code : '',
              }),
            );
          } else if (err.request) {
            reject(
              HttpUtility._fillInErrorWithDefaults({
                status: err.request.status,
                message:  err.request.statusText,
              }),
            );
          } else {
            reject(
              HttpUtility._fillInErrorWithDefaults({
                status: 0,
                message: err.message,
              }),
            );
          }
        });
    });
  }

  static _fillInErrorWithDefaults(error: any) {
    const model = new HttpErrorResponseModel();
    model.status = error.status || 0;
    model.message = error.message || 'Error requesting data';
    model.code = error.code || 'none';
    return model;
  }
}

export type RestRequest = {
  url: string;
  method: Method;
};
