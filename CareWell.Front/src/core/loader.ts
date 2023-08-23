import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { stringify } from 'query-string';
import { ClientAdapter, ClientFactory, createLoaderApi } from 'react-apiloader';

import { authInfoAtom } from '@/global/useAuth';
import { DateTime } from '@/utils/dateTime';

import { GlobalState } from './globalState';

export type ClientError = {
  description: string | string[];
  status?: number;
  data?: unknown;
};

export interface IAxiosClient {
  get<T, D = unknown>(
    url: string,
    params?: Record<string, unknown>,
    settings?: AxiosRequestConfig<D>
  ): Promise<T>;
  post<T, D = unknown>(
    url: string,
    data?: D,
    params?: Record<string, unknown>,
    settings?: AxiosRequestConfig<D>
  ): Promise<T>;
}

export const { createApiHook, createApiHookWithState, LoaderContextProvider, useLoaderInfo } =
  createLoaderApi<IAxiosClient, ClientError>();

export const createAxiosClientFactory =
  (baseUrl: string, state: GlobalState): ClientFactory<IAxiosClient, ClientError> =>
  () => {
    const source = axios.CancelToken.source();
    const token = state.tryGet(authInfoAtom)?.value()?.token;
    const auth: { Authorization: string } | Record<string, never> =
      token != null ? { Authorization: 'Bearer ' + token } : {};
    const appVersion = window?.appSettings?.appVersion;

    const axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        appVersion,
        ...auth,
      },
      cancelToken: source.token,
      paramsSerializer: (params: Record<string, unknown>) =>
        stringify(params, { arrayFormat: 'index' }),
    });

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          state.tryGet(authInfoAtom)?.setValue(undefined);
          state.reset();
        }
        return Promise.reject(error);
      }
    );

    const client: IAxiosClient = {
      get: <T, D = unknown>(
        url: string,
        params?: Record<string, unknown>,
        settings?: AxiosRequestConfig<D>
      ) =>
        axiosInstance.get<T, AxiosResponse<T>, D>(url, { params, ...settings }).then((x) => x.data),
      post: <T, D = unknown>(
        url: string,
        data?: D,
        params?: Record<string, unknown>,
        settings?: AxiosRequestConfig<D>
      ) => axiosInstance.post(url, data, { params, ...settings }).then((x) => x.data as T),
    };

    const adapter: ClientAdapter<ClientError> = {
      cancel: () => source.cancel(),
      isCanceled: (error: unknown) => axios.isCancel(error),
      parseError: (error: unknown) => {
        console.error('# ERROR #', error);
        if (axios.isAxiosError(error)) {
          const data = error.response?.data as {
            isError: boolean;
            message: string;
            title: string;
          };
          return {
            description: data?.isError ? data.message : data?.title ?? error.message,
            data,
            status: error.response?.status,
          };
        }
        return {
          description:
            (error as Error)?.message ??
            'Unknown error: ' + DateTime.format(new Date(), 'datetime'),
        };
      },
    };

    return [client, adapter];
  };
