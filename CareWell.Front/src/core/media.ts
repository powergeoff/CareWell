const mediaExpression = (breakpoint: number) => `@media (min-width: ${breakpoint}px)`;

export const breakpoint = {
  xs: 320, //425,
  sm: 425, //576,
  md: 768,
  hideMenu: 896,
  lg: 1024, //992,
  xl: 1440, //1200,
  xxl: 1920,
};

export const media = {
  xs: mediaExpression(320),
  sm: mediaExpression(425),
  md: mediaExpression(768),
  hideMenu: mediaExpression(896),
  lg: mediaExpression(1024),
  xl: mediaExpression(1440),
  xxl: mediaExpression(1920),
};
