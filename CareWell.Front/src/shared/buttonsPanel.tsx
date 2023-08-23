import { mergeStyles, mergeStyleSets, Stack } from '@fluentui/react';
import React from 'react';

import { appTheme } from '@/theme';

const buttonsPanel = mergeStyles({
  marginTop: '2rem !important',
});

const classes = mergeStyleSets({
  oneButton: [buttonsPanel],
  severalButtons: [
    {
      button: {
        width: `calc(50% - ${appTheme.spacing.m})`,
      },
    },
    buttonsPanel,
  ],
});

interface Props {
  tight?: boolean;
}

export const ButtonsPanel: React.FC<Props> = ({ tight, children }) => (
  <Stack
    horizontal
    horizontalAlign={tight ? 'center' : 'space-between'}
    className={tight ? classes.oneButton : classes.severalButtons}
    tokens={{ childrenGap: appTheme.spacing.m }}>
    {children}
  </Stack>
);
