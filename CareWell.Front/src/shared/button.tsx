import { DefaultButton, mergeStyleSets } from '@fluentui/react';
import clsx from 'clsx';
import React, { useMemo } from 'react';

import { appTheme } from '@/theme';

export interface ButtonProps {
  variant?: 'default' | 'primary' | 'blue' | 'green' | 'red' | 'select' | 'active' | undefined;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

let idCounter = 0;

const greenMain = 'hsla(90, 50%, 50%, 1)';
const greenHover = 'hsla(90, 45%, 45%, 1)';
const greenActive = 'hsla(90, 40%, 40%, 1)';

const redMain = 'hsla(344, 100%, 40%, 1)';
const redHover = 'hsla(344, 50%, 50%, 1)';
const redActive = 'hsla(344, 45%, 45%, 1)';

const cyanMain = 'hsla(204, 100%, 40%, 1.0)';
const cyanHover = 'hsla(204, 95%, 35%, 1.0)';
const cyanActive = 'hsla(204, 90%, 30%, 1.0)';

const classes = mergeStyleSets({
  greenStyle: {
    color: appTheme.palette.white,
    backgroundColor: greenMain,
    borderColor: greenMain,
    ':hover': {
      color: appTheme.palette.white,
      backgroundColor: greenHover,
      borderColor: greenHover,
    },
    ':active': {
      color: appTheme.palette.white,
      backgroundColor: greenActive,
      borderColor: greenActive,
    },
  },
  redButton: {
    color: appTheme.palette.white,
    backgroundColor: redMain,
    borderColor: redMain,
    ':hover': {
      color: appTheme.palette.white,
      backgroundColor: redHover,
      borderColor: redHover,
    },
    ':active': {
      color: appTheme.palette.white,
      backgroundColor: redActive,
      borderColor: redActive,
    },
  },
  blueButton: {
    color: appTheme.palette.white,
    backgroundColor: cyanMain,
    borderColor: cyanMain,
    ':hover': {
      color: appTheme.palette.white,
      backgroundColor: cyanHover,
      borderColor: cyanHover,
    },
    ':active': {
      color: appTheme.palette.white,
      backgroundColor: cyanActive,
      borderColor: cyanActive,
    },
  },
  selectButton: {
    border: '3px solid #3077C2',
    borderRadius: '10px',
    padding: appTheme.spacing.m,
    color: appTheme.palette.black,
    backgroundColor: appTheme.palette.white,
    minHeight: '75px',
    fontSize: '20px',
    ':hover': {
      color: appTheme.palette.black,
      backgroundColor: '#EBF0FA',
    },
    ':focus': {
      color: appTheme.palette.black,
      backgroundColor: '#EBF0FA',
    },
    ':active': {
      color: appTheme.palette.white,
      backgroundColor: '#0077C8',
    },
  },
  activeButton: {
    border: '3px solid #3077C2',
    borderRadius: '10px',
    padding: appTheme.spacing.m,
    color: appTheme.palette.white,
    backgroundColor: '#0077C8',
    minHeight: '75px',
    fontSize: '20px',
    ':hover': {
      color: appTheme.palette.white,
      backgroundColor: cyanHover,
    },
    ':active': {
      color: appTheme.palette.white,
      backgroundColor: cyanActive,
    },
  },
  roundedConerButton: {
    height: '40px',
    borderRadius: '20px',
    padding: '0.4rem 1rem 0.4rem 1rem',
  },
});

export const Button: React.FC<ButtonProps> = ({
  variant = undefined,
  onClick,
  className,
  disabled,
  children,
}) => {
  const id = useMemo(() => `button-${idCounter++}`, []);
  return (
    <DefaultButton
      id={id}
      className={clsx(className, {
        [classes.greenStyle]: variant === 'green',
        [classes.redButton]: variant === 'red',
        [classes.blueButton]: variant === 'blue',
        [classes.selectButton]: variant === 'select',
        [classes.activeButton]: variant === 'active',
        [classes.roundedConerButton]:
          variant === 'primary' ||
          variant === 'default' ||
          variant === 'green' ||
          variant === 'red',
      })}
      primary={variant === 'primary'}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </DefaultButton>
  );
};
