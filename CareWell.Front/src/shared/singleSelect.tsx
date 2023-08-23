import { Dropdown, IDropdownOption, Label, Stack } from '@fluentui/react';
import React, { useMemo } from 'react';

interface Props<TOption extends IDropdownOption, TKey extends string | number | null | undefined> {
  label?: React.ReactNode;
  value: TKey;
  onChange: (o: TOption) => void;
  options: TOption[];
  required?: boolean;
  className?: string;
}

let idCounter = 0;

export const SingleSelect = <
  TOption extends IDropdownOption,
  TKey extends string | number | null | undefined
>({
  label,
  value,
  onChange,
  options,
  required,
  className,
}: Props<TOption, TKey>) => {
  const id = useMemo(() => `singleselect-${idCounter++}`, []);
  return (
    <Stack className={className}>
      {label != null && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <Dropdown
        id={id}
        selectedKey={value}
        onChange={(_, o) => onChange(o as unknown as TOption)}
        options={options}
      />
    </Stack>
  );
};
