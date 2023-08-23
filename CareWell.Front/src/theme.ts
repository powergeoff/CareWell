import {
  createTheme,
  DefaultEffects,
  MotionDurations,
  MotionTimings,
  Theme,
} from '@fluentui/react';

export const fontWeights = {
  light: '100',
  regular: '400',
  bold: '700',
};

export const appTheme: Theme = createTheme({
  spacing: {
    s2: '0.25rem',
    s1: '0.5rem',
    m: '1rem',
    l1: '1.5rem',
    l2: '2rem',
  },
  fonts: {
    xSmall: { fontSize: '0.75rem' },
    small: { fontSize: '0.875rem' },
    medium: { fontSize: '1rem' },
    mediumPlus: { fontSize: '1.25rem' },
    large: { fontSize: '1.625rem' },
    xLarge: { fontSize: '1.875rem' },
    xxLarge: { fontSize: '2.625rem' },
  },
  palette: {
    themePrimary: '#003a96',
    themeLighterAlt: '#f1f5f9',
    themeLighter: '#c8d7ee',
    themeLight: '#9db6e0',
    themeTertiary: '#4d79c0',
    themeSecondary: '#144ba3',
    themeDarkAlt: '#003487',
    themeDark: '#002c72',
    themeDarker: '#002054',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#595959',
    neutralSecondary: '#373737',
    neutralPrimaryAlt: '#2f2f2f',
    neutralPrimary: '#000000',
    neutralDark: '#151515',
    black: '#0b0b0b',
    white: '#ffffff',
    red: '#CE0037',
    orange: '#CF7F00',
    green: '#71AE40',
    blue: '#023996',
    teal: '#B1E4E3',
    tealDark: '#029CA6',
    tealLight: '#E8F7F6',
  },
  defaultFontStyle: {
    color: 'inherit',
    fontSize: '1.35rem',
    fontWeight: fontWeights.regular,
    fontFamily: 'Roboto',
  },
  components: {
    DefaultButton: {
      styles: {
        root: {
          height: 'auto',
          minHeight: '2rem',
          padding: '0.25rem',
          borderRadius: DefaultEffects.roundedCorner4,
          boxShadow: DefaultEffects.elevation4,
          transition: `box-shadow ${MotionDurations.duration2} ${MotionTimings.standard}`,
          ':hover': {
            boxShadow: DefaultEffects.elevation8,
          },
          alignContent: 'left',
        },
      },
    },
    Label: {
      styles: {
        root: {
          height: 'auto',
          minHeight: '1rem',
          padding: '0.25rem',
          fontSize: '1.15rem',
          fontWeight: fontWeights.bold,
          color: '#023996',
        },
      },
    },
    TextField: {
      styles: {
        fieldGroup: {
          background: 'transparent',
        },
      },
    },
    Dropdown: {
      styles: {
        title: {
          background: 'transparent',
          borderStyle: 'none none solid none',
          borderRadius: 0,
        },
        dropdown: {
          '&:focus::after': {
            borderStyle: 'none none solid none',
          },
        },
        callout: {
          height: '100vh',
        },
      },
    },
    MessageBar: {
      styles: {
        root: {
          borderRadius: '0.25rem',
          padding: '0.2rem',
        },
        content: {
          lineHeight: 'inherit',
        },
        innerText: {
          width: '100%',
          lineHeight: 'normal',
        },
      },
    },
    Link: {
      styles: {
        root: {
          textDecoration: 'underline',
          ':visited': {
            color: '#551A8B',
          },
        },
      },
    },
  },
});
