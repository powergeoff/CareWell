import { mergeStyleSets, Spinner, SpinnerSize, Stack } from '@fluentui/react';
import React from 'react';
import { AppKey } from 'react-apiloader';

import { useLoaderInfo } from '@/core/loader';
import { useMessages } from '@/core/useMessages';
import { Button, Message, T } from '@/shared';
import { appTheme } from '@/theme';

interface Props {
  actionType: AppKey;
  mode?: AppKey;
  action: () => void;
  className?: string;
}

const classes = mergeStyleSets({
  errorMsgWithBttn: [
    {
      width: '100%',
    },
  ],
});

export const RepeatPanel: React.FC<Props> = ({ actionType, mode, action, children, className }) => {
  const item = useLoaderInfo(actionType, mode);
  const [messages] = useMessages(actionType, {
    textTranslationPrefix: 'serverErrors.',
    htmlTranslationPrefix: 'serverErrors.',
  });

  if (item?.isWaiting)
    return (
      <Stack
        className={className}
        horizontalAlign="center"
        verticalAlign="center"
        tokens={{ childrenGap: appTheme.spacing.s1 }}>
        <Spinner size={SpinnerSize.large}></Spinner>
      </Stack>
    );

  if (item?.isError) {
    return (
      <Stack
        className={className}
        horizontalAlign="center"
        verticalAlign="center"
        tokens={{ childrenGap: appTheme.spacing.s1 }}>
        <Message
          variant="warning"
          className={classes.errorMsgWithBttn}
          actions={
            <Button variant="primary" onClick={action}>
              <T>common.repeat</T>
            </Button>
          }>
          <T>serverErrors.T_GENERIC</T>
        </Message>
        {messages}
      </Stack>
    );
  }

  return <>{children}</>;
};
