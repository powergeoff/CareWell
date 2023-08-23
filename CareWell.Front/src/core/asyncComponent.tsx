import { Spinner } from '@fluentui/react';
import React, { Suspense } from 'react';

export const asyncComponent = (get: () => Promise<React.FC<unknown>>): React.FC => {
  const Comp = React.lazy(() => get().then((x) => ({ default: x })));
  return () => (
    <Suspense fallback={<Spinner label="Loading..." labelPosition="right" />}>
      <Comp></Comp>
    </Suspense>
  );
};
