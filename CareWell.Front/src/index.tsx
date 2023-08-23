import '@fontsource/roboto';
import 'normalize.css';
import 'core-js';

import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Spinner, ThemeProvider, mergeStyles } from '@fluentui/react';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { GlobalState, GlobalStateContext } from '@/core/globalState';
import { createAxiosClientFactory, LoaderContextProvider } from '@/core/loader';
import { media } from '@/core/media';
import { appTheme } from '@/theme';

import { App } from '@/app/app';

initializeIcons();

const rootClass = mergeStyles({
  ':global(html)': {
    ...appTheme.fonts.small,
    [media.md]: {
      ...appTheme.fonts.medium,
    },
  },
  ':global(*)': {
    boxSizing: 'border-box',
  },
});


const state = new GlobalState();
const axiosClientFactory = createAxiosClientFactory('/api', state);

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <ThemeProvider theme={appTheme} applyTo="body" className={rootClass}>
    <GlobalStateContext.Provider value={state}>
    <LoaderContextProvider clientFactory={axiosClientFactory}>
          <Router>
    <Suspense fallback={<Spinner label="Loading..." labelPosition="right" />}>
      <App />
    </Suspense>
    </Router>
        </LoaderContextProvider>
    </GlobalStateContext.Provider>
  </ThemeProvider>
);
