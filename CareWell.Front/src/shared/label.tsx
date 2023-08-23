import { mergeStyleSets, Label } from '@fluentui/react';
import clsx from 'clsx';
import React, { useMemo } from 'react';

import { appTheme } from '@/theme';

export interface Props {
  variant?: 'default' | 'blue' | 'green' | 'red' | 'black' | undefined;
  className?: string;
  hiden?: boolean;
}

let idCounter = 0;

const greenMain = 'hsla(90, 50%, 50%, 1)';
const redMain = 'hsla(0, 55%, 55%, 1)';
const cyanMain = 'hsla(204, 100%, 40%, 1.0)';

const classes = mergeStyleSets({
  blackStyle: {
    color: appTheme.palette.black,
    backgroundColor: appTheme.palette.white,
    borderColor: appTheme.palette.black,
  },
  greenStyle: {
    color: appTheme.palette.green,
    backgroundColor: appTheme.palette.white,
    borderColor: greenMain,
  },
  redLabel: {
    color: appTheme.palette.red,
    backgroundColor: appTheme.palette.white,
    borderColor: redMain,
  },
  blueLabel: {
    color: appTheme.palette.blue,
    backgroundColor: appTheme.palette.white,
    borderColor: cyanMain,
  },
});

export const LabelField: React.FC<Props> = ({
  variant = undefined,
  className,
  hiden,
  children,
}) => {
  const id = useMemo(() => `label-${idCounter++}`, []);
  return (
    <Label
      id={id}
      className={clsx(className, {
        [classes.greenStyle]: variant === 'green',
        [classes.redLabel]: variant === 'red',
        [classes.blueLabel]: variant === 'blue',
        [classes.blackStyle]: variant === 'black',
      })}
      hidden={hiden}>
      {children}
    </Label>
  );
};
