import { mergeStyleSets } from '@fluentui/react';
import clsx from 'clsx';
import React from 'react';
//import { useTranslation } from 'react-i18next';

import { appTheme } from '@/theme';

interface Props {
  className?: string;
  size?: 'xs' | 's' | 'm' | 'mp' | 'l' | 'xl' | 'xxl';
  html?: boolean;
  block?: boolean;
  values?: Record<string, unknown>;
}

const classes = mergeStyleSets({
  xs: appTheme.fonts.xSmall,
  s: appTheme.fonts.small,
  m: appTheme.fonts.medium,
  mp: appTheme.fonts.mediumPlus,
  l: appTheme.fonts.large,
  xl: appTheme.fonts.xLarge,
  xxl: appTheme.fonts.xxLarge,
});

export const T: React.FC<Props> = ({ children, className, size, block, html }) => {
  //const { t } = useTranslation();
  const content =  (children as string);
  //const content = typeof children === 'string' ? t(children, values) : (children as string);
  const classname = clsx(className, { [classes[size ?? 'm']]: size != null });

  if (block && html)
    return <div className={classname} dangerouslySetInnerHTML={{ __html: content }} />;
  if (block) return <div className={classname}>{content}</div>;
  if (html) return <span className={classname} dangerouslySetInnerHTML={{ __html: content }} />;
  return <span className={classname}>{content}</span>;
};
