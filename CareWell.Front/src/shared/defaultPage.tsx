import {
  mergeStyleSets,
  Stack,
} from '@fluentui/react';
import React, {  useEffect } from 'react';
import { breakpoint, media } from '@/core/media';
import { T, MgbLogo } from '@/shared';
import { appTheme, fontWeights } from '@/theme';

const classes = mergeStyleSets({
  root: {
    backgroundColor: appTheme.palette.themeLighterAlt,
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '4rem',
    zIndex: 999,
    color: appTheme.palette.white,
    backgroundColor: appTheme.palette.themeSecondary,
    button: {
      height: '100%',
    },
  },
  logo: {
    padding: appTheme.spacing.s1,
  },
  image: {
    height: '2rem',
    [media.sm]: {
      height: '2.5rem',
    },
    [media.md]: {
      height: '2.5rem',
    },
    [media.hideMenu]: {
      height: '2rem',
    },
    [media.lg]: {
      height: '2.5rem',
    },
    [media.xl]: {
      height: '3rem',
    },
  },
  mgb: {
    paddingLeft: appTheme.spacing.s2,
    ...appTheme.fonts.medium,
    fontWeight: fontWeights.bold,
    [media.sm]: {
      ...appTheme.fonts.mediumPlus,
      fontWeight: fontWeights.bold,
    },
    [media.md]: {
      ...appTheme.fonts.mediumPlus,
      fontWeight: fontWeights.bold,
    },
    [media.hideMenu]: {
      ...appTheme.fonts.medium,
      fontWeight: fontWeights.bold,
    },
    [media.lg]: {
      ...appTheme.fonts.mediumPlus,
      fontWeight: fontWeights.bold,
    },
    [media.xl]: {
      ...appTheme.fonts.large,
      fontWeight: fontWeights.bold,
    },
    [media.xxl]: {
      ...appTheme.fonts.xLarge,
      fontWeight: fontWeights.bold,
    },
  },
  ww: {
    paddingLeft: appTheme.spacing.l2,
    ...appTheme.fonts.medium,
    [media.sm]: {
      paddingLeft: '3.5rem',
      ...appTheme.fonts.mediumPlus,
    },
    [media.md]: {
      paddingLeft: '6rem',
    },
    [media.hideMenu]: {
      paddingLeft: '2rem',
    },
    [media.lg]: {
      paddingLeft: '2rem',
    },
    [media.xl]: {
      paddingLeft: '4rem',
      ...appTheme.fonts.large,
    },
    [media.xxl]: {
      paddingLeft: '8rem',
      ...appTheme.fonts.xLarge,
    },
  },
  showOnDesktop: {
    display: 'none',
    [media.hideMenu]: {
      display: 'flex',
    },
  },
  showOnMobile: {
    display: 'flex',
    [media.hideMenu]: {
      display: 'none',
    },
  },
  main: {
    marginTop: '4rem !important',
  },
  container: {
    alignItems: 'center',
    width: '100%',
    maxWidth: breakpoint.xl,
    minHeight: 'calc(100vh - 4rem)',
    paddingLeft: appTheme.spacing.l2,
    paddingRight: appTheme.spacing.l2,
    paddingTop: appTheme.spacing.l1,
    paddingBottom: appTheme.spacing.l1,
  },
});


interface Props {
  showMenu?: 'full' | 'lang' | 'none';
  title?: string;
  className?: string;
}

export const DefaultPage: React.FC<Props> = ({ children, title, showMenu = 'none' }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <Stack id="default-page" className={classes.root}>
      <Stack
        id="default-page-header"
        className={classes.header}
        horizontal
        horizontalAlign="space-between">
        <Stack
          id="default-page-header-logo"
          className={classes.logo}
          horizontal
          verticalAlign="center"
          horizontalAlign="start">
          <Stack id="default-page-header-logo-image" className={classes.image}>
            <MgbLogo color={appTheme.palette.white} />
          </Stack>
          <Stack id="default-page-header-logo-text-mgb" className={classes.mgb}>
            Mass General Brigham
          </Stack>
          <Stack id="default-page-header-logo-text-ww" className={classes.ww}>
            CareWell
          </Stack>
        </Stack>
      </Stack>
      <Stack className={classes.main} horizontalAlign="center">
        <Stack className={classes.container} tokens={{ childrenGap: appTheme.spacing.m }}>
          {title && <T size="mp">{title}</T>}
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
};
