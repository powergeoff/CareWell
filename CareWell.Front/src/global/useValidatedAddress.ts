import { ValidatedAddressResponse } from '@/models/homeAddress';
import { createAtom, useAtom } from '@/core/globalState';

export const validatedAddressAtom = createAtom<ValidatedAddressResponse | undefined>({
  init: undefined,
});

export const useValidatedAddress = () => useAtom(validatedAddressAtom);
