//import { createApiHookWithAtom } from '@/core/createApiHookWithAtom';
import { createApiHook, createApiHookWithState } from '@/core/loader';
//import { useValidatedAddress } from '@/global/useValidatedAddress';
import {
  ValidateAddressRequest,
  ValidatedAddressResponse,
  SubmitAddressRequest,
} from '@/models/homeAddress';

const baseUrl = 'homeAddress/';

export const useValidateHomeAddress = createApiHookWithState<
  ValidatedAddressResponse | undefined,
  ValidateAddressRequest
>((http, params) => {
  const formData = new FormData();
  formData.append('Address', params.address);
  formData.append('Unit', params.unit ?? '');
  formData.append('City', params.city);
  formData.append('State', params.state);
  formData.append('ZipCode', params.zipCode);
  return http.post(baseUrl + 'validate', formData);
}, undefined);

export const useGetLastHomeAddress = createApiHookWithState<
  ValidatedAddressResponse | undefined,
  { epicParameters: string }
>(
  (http, params) => http.get<ValidatedAddressResponse>(baseUrl + 'getHomeAddress', { ...params }),
  undefined
);

export const useSubmitHomeAddress = createApiHook<undefined, SubmitAddressRequest>((http, params) =>
  http.post(baseUrl + 'saveHomeAddress', { ...params })
);
