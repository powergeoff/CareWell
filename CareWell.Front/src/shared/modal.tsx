import { FontWeights, mergeStyleSets } from '@fluentui/react';
import clsx from 'clsx';
import React from 'react';
import ReactDOM from 'react-dom';

import { Backdrop, Button } from '@/shared';
import { appTheme } from '@/theme';

const classes = mergeStyleSets({
  modal: {
    position: 'fixed',
    zIndex: '500',
    top: '30%',
    left: '15%',
    width: '70%',
    maxWidth: '90%',
    maxHeight: '90%',
    padding: '1rem',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    boxShadow: '1px 1px 1px black',
    transition: 'all 0.3s ease-out',

    '.header': {
      fontWeight: FontWeights.bold,
      color: 'black',
      padding: '0.6rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: '1px solid black',
    },

    '.close': {
      fontSize: '1.5rem',
      cursor: 'pointer',
    },

    '.content': {
      padding: '1rem',
    },

    '.body': {
      fontSize: '1rem',
      color: 'black',
      overflowWrap: 'break-word',
    },

    '.footer': {
      display: 'flex',
      flexDirection: 'row-reverse',
      marginTop: appTheme.spacing.m,
      paddingRight: appTheme.spacing.m,
    },
  },
});

interface Props {
  className?: string;
  modalShow?: boolean;
  modalTitle?: string;
  modalMessage?: string;
  modalClose: () => void;
}

export const Modal: React.FC<Props> = ({
  className,
  modalShow,
  modalTitle,
  modalMessage,
  modalClose,
  ...other
}) => {
  const classname = clsx(classes.modal, className);

  const BackdropOverlay = () => {
    return <Backdrop showBackdrop={modalShow} clickHandler={modalClose} />;
  };

  const ModalOverlay = () => {
    return (
      <div
        className={classname}
        style={{
          transform: modalShow ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: modalShow ? '1' : '0',
        }}
        {...other}>
        <header className="header">
          <div>{modalTitle}</div>
        </header>
        <div className="content">
          <div className="body">{modalMessage}</div>
        </div>
        <footer className="footer">
          <Button variant="red" onClick={modalClose}>
            Close
          </Button>
        </footer>
      </div>
    );
  };

  return (
    <>
      {ReactDOM.createPortal(
        <BackdropOverlay />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay />,
        document.getElementById('modal-root') as HTMLElement
      )}
    </>
  );
};
