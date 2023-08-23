import { DefaultEffects, memoizeFunction, mergeStyles, Stack } from '@fluentui/react';
import clsx from 'clsx';
import React from 'react';

import { T } from '@/shared';
import { appTheme, fontWeights } from '@/theme';

type Variant = 'warning' | 'success' | 'info' | 'danger' | 'login' | 'profile';

interface Props {
  label?: string;
  variant?: Variant;
  className?: string;
}

const cardStyle = memoizeFunction((variant?: Variant) => {
  let variantColor: string;
  let labelColor: string;
  let borderColor: string;
  switch (variant) {
    case 'profile':
      variantColor = '#CFCFCF';
      labelColor = appTheme.palette.black;
      borderColor = appTheme.palette.black;
      break;
    case 'login':
      variantColor = appTheme.palette.themeDark;
      labelColor = appTheme.palette.white;
      borderColor = appTheme.palette.themeDark;
      break;
    case 'success':
      //variantColor = appTheme.palette.green;
      variantColor = '#71AE40';
      labelColor = appTheme.palette.white;
      borderColor = appTheme.palette.black;
      break;
    case 'warning':
      //variantColor = appTheme.palette.orange;
      variantColor = '#F6BD39';
      labelColor = appTheme.palette.black;
      borderColor = appTheme.palette.black;
      break;
    case 'danger':
      //variantColor = appTheme.palette.red;
      variantColor = '#CE0037';
      labelColor = appTheme.palette.white;
      borderColor = appTheme.palette.black;
      break;
    case 'info':
      variantColor = appTheme.palette.tealDark;
      labelColor = appTheme.palette.white;
      borderColor = appTheme.palette.black;
      break;
    default:
      variantColor = appTheme.palette.themePrimary;
      labelColor = appTheme.palette.white;
      borderColor = appTheme.palette.black;
      break;
  }
  return mergeStyles({
    border: '1px solid ' + borderColor,
    borderRadius: DefaultEffects.roundedCorner6,
    backgroundColor: appTheme.palette.white,
    '& .card-label': {
      color: labelColor,
      backgroundColor: variantColor,
      fontWeight: fontWeights.bold,
      padding: appTheme.spacing.m,
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 'inherit',
    },
    '& .card-body': {
      paddingTop: appTheme.spacing.m,
      paddingRight: appTheme.spacing.l2,
      paddingBottom: appTheme.spacing.m,
      paddingLeft: appTheme.spacing.l2,
    },
  });
});

export const DefaultCard: React.FC<Props> = ({ label, className, children, variant }) => {
  return (
    <Stack className={clsx(cardStyle(variant), className)}>
      {label && (
        <Stack className="card-label">
          <T>{label}</T>
        </Stack>
      )}
      <Stack className="card-body" tokens={{ childrenGap: appTheme.spacing.m }}>
        {children}
      </Stack>
    </Stack>
  );
};
