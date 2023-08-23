import { mergeStyleSets } from '@fluentui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppKey } from 'react-apiloader';

import { Message, T } from '@/shared';

import { useLoaderInfo } from './loader';

interface Config {
  mode?: AppKey;
  textTranslationPrefix?: string;
  htmlTranslationPrefix?: string;
}

const classes = mergeStyleSets({
  errorMsg: [
    {
      width: '100%',
    },
  ],
});

export const useMessages = (id: AppKey = 'none', config?: Config) => {
  const textPrefix = config?.textTranslationPrefix ?? '';
  const htmlPrefix = config?.htmlTranslationPrefix ?? '';

  const info = useLoaderInfo(id, config?.mode);
  const [messages, setMessages] = useState<React.ReactNode[]>([]);

  const set = useCallback(
    (message?: string | string[]) => {
      if (message == null) setMessages([]);
      else {
        const messages = Array.isArray(message) ? message : [message];
        setMessages(messages.map((x, i) => <T key={i}>{textPrefix + x}</T>));
      }
    },
    [textPrefix]
  );
  const isMount = useRef(true);
  useEffect(() => {
    if (isMount.current) {
      isMount.current = false;
      return;
    }
    let messages: React.ReactNode[] = [];
    if (info?.isError && info.error.description) {
      messages = (
        Array.isArray(info.error.description) ? info.error.description : [info.error.description]
      ).map((x, i) => (
        <T size="xs" html key={i} values={info.error.data as Record<string, unknown>}>
          {htmlPrefix + x}
        </T>
      ));
    }
    setMessages(messages);
  }, [htmlPrefix, info]);

  const content = messages.length > 0 && (
    <Message variant="error" className={classes.errorMsg}>
      {messages.map((x, i) => (
        <div key={i}>{x}</div>
      ))}
    </Message>
  );

  return [content, set] as const;
};
