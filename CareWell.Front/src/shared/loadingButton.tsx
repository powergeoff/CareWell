import { Spinner, SpinnerSize } from '@fluentui/react';
import React from 'react';
import { AppKey } from 'react-apiloader';

import { useLoaderInfo } from '@/core/loader';

import { Button, ButtonProps } from './button';

interface Props extends ButtonProps {
  actionType: AppKey;
  mode?: AppKey;
  disabled?: boolean;
}

export const LoadingButton: React.FC<Props> = ({
  actionType,
  mode = undefined,
  children,
  disabled,
  ...other
}) => {
  const item = useLoaderInfo(actionType, mode);
  const content = item?.isWaiting ? <Spinner size={SpinnerSize.small} /> : children;
  const isDisabled = item?.isWaiting || disabled;
  return (
    <Button disabled={isDisabled} {...other}>
      {content}
    </Button>
  );
};
