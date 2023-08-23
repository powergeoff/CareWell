import { mergeStyleSets } from '@fluentui/react';
import clsx from 'clsx';
import React from 'react';

const classes = mergeStyleSets({
  backdrop: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: '100',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

interface Props {
  className?: string;
  showBackdrop?: boolean;
  clickHandler: () => void;
}

export const Backdrop: React.FC<Props> = ({ className, showBackdrop, clickHandler, ...other }) => {
  const classname = clsx(classes.backdrop, className);

  return showBackdrop ? <div className={classname} {...other} onClick={clickHandler}></div> : null;
};
