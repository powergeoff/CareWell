import { MessageBar, MessageBarType, mergeStyleSets } from '@fluentui/react';
import clsx from 'clsx';
import React, { useMemo } from 'react';

interface Props {
  actions?: JSX.Element;
  className?: string;
  isMultiline?: boolean;
  variant?: 'info' | 'error' | 'warning' | 'success';
  hideIcon?: boolean;
}

let idCounter = 0;

const classes = mergeStyleSets({
  info: {
    backgroundColor: '#E5F1FA',
  },
});

export const Message: React.FC<Props> = ({
  actions,
  children,
  className,
  hideIcon,
  isMultiline,
  variant = 'info',
}) => {
  const id = useMemo(() => `message-${idCounter++}`, []);
  const containerStyle = clsx(className, {});
  const messageStyle = clsx({
    [classes.info]: variant === 'info',
  });

  let messageType = undefined;
  switch (variant) {
    case 'success':
      messageType = MessageBarType.success;
      break;
    case 'warning':
      messageType = MessageBarType.severeWarning;
      break;
    case 'error':
      messageType = MessageBarType.error;
      break;
    case 'info':
    default:
      messageType = MessageBarType.info;
  }

  return (
    <div id={id} role="status" className={containerStyle}>
      <MessageBar
        role="none"
        messageBarType={messageType}
        className={messageStyle}
        actions={actions}
        styles={hideIcon ? { iconContainer: { display: 'none' } } : undefined}
        isMultiline={isMultiline}>
        {children}
      </MessageBar>
    </div>
  );
};
