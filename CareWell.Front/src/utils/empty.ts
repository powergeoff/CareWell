export const isNotEmpty = (parameter: string | undefined | null): parameter is string =>
  !isEmpty(parameter);
export const isEmpty = (parameter: string | undefined | null): parameter is undefined | null | '' =>
  parameter == null || parameter === '';
