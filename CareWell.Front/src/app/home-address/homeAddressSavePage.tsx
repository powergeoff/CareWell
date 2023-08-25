import React from 'react';
import { useValidateHomeAddress } from '@/api/homeAddressApi';
import { useValidatedAddress } from '@/global/useValidatedAddress';

export const HomeAddressSavePage: React.FC = () => {
  const myAtom = useValidatedAddress();
  console.log(myAtom[1]);
  const [validAddress] = useValidateHomeAddress();
  console.log(validAddress?.address);
  return <>Hello Save Page</>;
};
