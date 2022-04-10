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

const NO_AUTH_URL = ["signin", "signup"];

function isAuthTokenNeeded(requestUrl: string) {
  for (let idx in NO_AUTH_URL) {
    if (requestUrl.endsWith(NO_AUTH_URL[idx])) {
      return false;
    }
  }
  return true;
}


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

  static async delete(endpoint: string, data: any) {
    const config = data ? { data } : undefined;
    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Delete as Method,
      },
      config,
    );
  }

  static async _request(restRequest: RestRequest, config: any) {
    const axiosRequestConfig = {
      method: restRequest.method,
      url: restRequest.url,
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(isAuthTokenNeeded(restRequest.url) && {Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`}),
      },
      ...(restRequest.method==='GET' ? {params: config?.data} : {data: config?.data})
    };

    await HttpUtility._delay();

    return new Promise((resolve, reject) => {
      axios(axiosRequestConfig)
        .then((res) => {
          const result = res.data;
          resolve(result);
        })
        .catch((err) => {
          if (err.response) {
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

  //TODO: remove it
  static _delay(duration = 1000) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }
}

export type RestRequest = {
  url: string;
  method: Method;
};


