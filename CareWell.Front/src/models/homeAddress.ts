export interface ValidateAddressRequest {
  address: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface ValidatedAddressResponse extends ValidateAddressRequest {
  returnText: string;
}

export interface SubmitAddressRequest extends ValidateAddressRequest {
  epicParameters: string;
}
