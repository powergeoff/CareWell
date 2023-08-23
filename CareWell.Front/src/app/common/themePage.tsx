import { isReadable } from '@ctrl/tinycolor';
import Icons from '@fluentui/font-icons-mdl2/lib/data/AllIconNames.json';
import { Icon, IPalette, mergeStyleSets, Stack } from '@fluentui/react';
import React, { useState } from 'react';

import { media } from '@/core/media';
import { Button, DefaultCard, Input, T } from '@/shared';
import { ButtonsPanel } from '@/shared/buttonsPanel';
import { appTheme } from '@/theme';
import { isEmpty } from '@/utils/empty';

const colors: (keyof IPalette)[] = [
  'themeDarker',
  'themeDark',
  'themeDarkAlt',
  'themePrimary',
  'themeSecondary',
  'themeTertiary',
  'themeLight',
  'themeLighter',
  'themeLighterAlt',
  'black',
  'blackTranslucent40',
  'neutralDark',
  'neutralPrimary',
  'neutralPrimaryAlt',
  'neutralSecondary',
  'neutralSecondaryAlt',
  'neutralTertiary',
  'neutralTertiaryAlt',
  'neutralQuaternary',
  'neutralQuaternaryAlt',
  'neutralLight',
  'neutralLighter',
  'neutralLighterAlt',
  'accent',
  'white',
  'whiteTranslucent40',
  'yellowDark',
  'yellow',
  'yellowLight',
  'orange',
  'orangeLight',
  'orangeLighter',
  'redDark',
  'red',
  'magentaDark',
  'magenta',
  'magentaLight',
  'purpleDark',
  'purple',
  'purpleLight',
  'blueDark',
  'blueMid',
  'blue',
  'blueLight',
  'tealDark',
  'teal',
  'tealLight',
  'greenDark',
  'green',
  'greenLight',
];

const classes = mergeStyleSets({
  colorbox: {
    width: `calc(100% / 7 - ${appTheme.spacing.m})`,
    minWidth: '6rem',
    height: '3rem',
    overflow: 'hidden',
    fontSize: appTheme.fonts.tiny.fontSize,
  },
  control: {
    width: '100%',
    [media.md]: {
      width: `calc(50% - ${appTheme.spacing.m})`,
    },
  },
  iconsPanel: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.25rem',
    fontSize: '2rem',
  },
});


export const ThemePage: React.FC = () => {
  const [text, setText] = useState('Jhon Dow');
  const [iconFilter, setIconFilter] = useState('');
  return (
    <>
      <Stack tokens={{ childrenGap: appTheme.spacing.m }}>
        <Stack horizontal wrap tokens={{ childrenGap: appTheme.spacing.m }}>
          {colors.map((color) => (
            <div
              key={color}
              className={classes.colorbox}
              style={{
                border: '1px solid gray',
                padding: appTheme.spacing.s2,
                background: appTheme.palette[color],
                color: isReadable(appTheme.palette.white, appTheme.palette[color])
                  ? appTheme.palette.white
                  : appTheme.palette.black,
              }}
              title={color}>
              {color}
            </div>
          ))}
        </Stack>
        <T size="mp">Example of card</T>
        <DefaultCard>
          <Stack horizontal wrap tokens={{ childrenGap: appTheme.spacing.m }}>
            <Input
              label="Full Name"
              className={classes.control}
              value={text}
              onChange={setText}></Input>
            <ButtonsPanel>
              <Button onClick={() => 1}>
                <T>Default Translated Button</T>
              </Button>
              <Button variant="primary" onClick={() => 1}>
                <T>Primary Translated Button</T>
              </Button>
            </ButtonsPanel>
          </Stack>
        </DefaultCard>
      </Stack>
      <div>
        <input
          onChange={(e) => setIconFilter(e.target.value)}
          value={iconFilter}
          placeholder="Icon Filter"
        />
      </div>
      <div className={classes.iconsPanel}>
        {Icons.filter(
          (x) =>
            x.name &&
            (isEmpty(iconFilter) || x.name.toLowerCase().includes(iconFilter.toLowerCase()))
        ).map((icon) => (
          <Icon key={icon.name} iconName={icon.name} title={icon.name} />
        ))}
      </div></>
  );
};
