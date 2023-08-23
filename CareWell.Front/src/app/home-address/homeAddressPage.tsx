import { Stack, mergeStyleSets } from '@fluentui/react';
import React, { useEffect, useState, useCallback } from 'react';
import * as yup from 'yup';

import {
  useValidateHomeAddress,
  useGetLastHomeAddress,
  useSubmitHomeAddress,
} from '@/api/homeAddressApi';
import { media } from '@/core/media';
import { useLocationParams } from '@/core/router';
import { useMessages } from '@/core/useMessages';
import { ValidateAddressRequest, ValidatedAddressResponse } from '@/models/homeAddress';
import { LoadingButton, Button, T, DefaultCard } from '@/shared';
import { ButtonsPanel } from '@/shared/buttonsPanel';
import { InputTopLabel } from '@/shared/inputTopLabel';
import { appTheme } from '@/theme';

const classes = mergeStyleSets({
  control: {
    width: '100%',
    [media.md]: {
      width: `calc(50% - ${appTheme.spacing.m})`,
    },
  },
});

const addressValidateSchema = yup.object().shape({
  zipCode: yup.string().required('5 digit zip code is required'),
  //.matches(/^[0-9]+$/, 'Zip Code Must be only digits')
  //.min(5, 'Zip Code Must be exactly 5 digits')
  //.max(5, 'Zip Code Must be exactly 5 digits'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  address: yup.string().required('Street Address is required'),
});

//?epicParameters=KGHRXREZBMBCBAKI9NvuCt6%2BV7pl0DQHgSnD8%2BtR5qjExO0oKl6uTyb6YmSilJTIh5DApLa31wwvGoubVPlG8XiifO5MRxOMZMC4um15BdpXWFvkkB1n9MxcPUpj9OVRWTCeuMyuU9Z%2BD6RDFFJJZrY6STIobU96DdzivFjN08EF2Kd7KnFFjGyOiR4%3D

export const HomeAddressPage: React.FC = () => {
  const [{ epicParameters }] = useLocationParams<{ epicParameters: string }>();
  const [validAddress, setValidAddress] = useState<ValidatedAddressResponse>();
  const [homeAddress, getHomeAddressApi] = useGetLastHomeAddress();

  const [form, setForm] = useState<ValidateAddressRequest>({
    address: '',
    unit: '',
    city: '',
    state: '',
    zipCode: '',
  });

  useEffect(() => {
    void getHomeAddressApi({ epicParameters }).catch((e) => console.error(e));
  }, [getHomeAddressApi, epicParameters]);

  useEffect(() => {
    if (homeAddress !== undefined) {
      setForm({ ...homeAddress });
    }
  }, [homeAddress]);

  const validateHomeAddress = useValidateHomeAddress();

  const [validateAddressMessages, setValidateAddressMessages] = useMessages(
    useValidateHomeAddress.id
  );

  const submitAddressValidationHandler = useCallback(() => {
    addressValidateSchema
      .validate(form)
      .then(() => validateHomeAddress(form))
      .then((response) => {
        if (response.isSuccess) {
          setValidAddress(response.data);
        }
        return response;
      })
      .catch((e: Error) => {
        setValidateAddressMessages(e.message);
        //void getHomeAddressApi({ epicParameters }); //bad??
      });
  }, [setValidateAddressMessages, form, validateHomeAddress]);

  const submitHomeAddress = useSubmitHomeAddress();
  const [submitAddressMessages, setSubmitAddressMessages] = useMessages(useSubmitHomeAddress.id);
  const submitHomeAddressHandler = useCallback(() => {
    validAddress &&
      void submitHomeAddress({
        epicParameters: epicParameters,
        address: validAddress.address,
        city: validAddress.city,
        state: validAddress.state,
        zipCode: validAddress.zipCode,
      }).catch((e: Error) => setSubmitAddressMessages(e.message));
  }, [submitHomeAddress, validAddress, epicParameters, setSubmitAddressMessages]);

  const clearForm = () => {
    setForm({ ...form, address: '', unit: '', city: '', state: '', zipCode: '' });
    setValidAddress(undefined);
  };
  return (
    <DefaultCard variant="info" label="CareWell">
      <T block size="l">
        Add Your Primary Home Address
      </T>
      <Stack>
        <Stack horizontal wrap tokens={{ childrenGap: appTheme.spacing.m }}>
          <InputTopLabel
            label="Street Address"
            className={classes.control}
            value={form.address}
            required
            onChange={(x) => setForm({ ...form, address: x })}></InputTopLabel>
          <InputTopLabel
            label="Unit"
            className={classes.control}
            value={form.unit}
            onChange={(x) => setForm({ ...form, unit: x })}></InputTopLabel>
          <InputTopLabel
            label="City"
            autoComplete="address-level2"
            className={classes.control}
            value={form.city}
            required
            onChange={(x) => setForm({ ...form, city: x })}></InputTopLabel>
          <InputTopLabel
            label="State"
            autoComplete="address-level1"
            className={classes.control}
            value={form.state}
            required
            onChange={(x) => setForm({ ...form, state: x })}></InputTopLabel>
          <InputTopLabel
            label="Zip Code"
            autoComplete="postal-code"
            className={classes.control}
            value={form.zipCode}
            required
            onChange={(x) => setForm({ ...form, zipCode: x })}></InputTopLabel>
        </Stack>
        <ButtonsPanel tight>
          <LoadingButton
            actionType={useValidateHomeAddress.id}
            variant="primary"
            onClick={submitAddressValidationHandler}>
            <T>Validate Address</T>
          </LoadingButton>
          <Button onClick={clearForm} variant="default">
            Clear Form
          </Button>
        </ButtonsPanel>
        {validateAddressMessages}
        {validAddress && (
          <>
            <br />
            <T block size="l">
              USPS Validated Address
            </T>
            <br />
            <Stack>
              <T block>{validAddress.address}</T>
              <T block>
                {validAddress.city}, {validAddress.state}
              </T>
              <T block>{validAddress.zipCode}</T>
              {validAddress.returnText && <T block>{validAddress.returnText}</T>}

              <ButtonsPanel tight>
                <LoadingButton
                  actionType={useSubmitHomeAddress.id}
                  variant="primary"
                  onClick={submitHomeAddressHandler}>
                  <T>File Validated Address</T>
                </LoadingButton>
              </ButtonsPanel>
            </Stack>
            {submitAddressMessages}
          </>
        )}
      </Stack>
    </DefaultCard>
  );
};
