import {
  Label,
  Stack,
  ChoiceGroup as FluentChoiceGroup,
  IChoiceGroupOption,
} from '@fluentui/react';
import React, { useMemo } from 'react';

interface Props<TOption extends IChoiceGroupOption, TKey extends string | undefined> {
  label?: React.ReactNode;
  value: TKey;
  onChange: (o: TOption) => void;
  options: TOption[];
  required?: boolean;
  className?: string;
}

let idCounter = 0;

export const ChoiceGroup = <TOption extends IChoiceGroupOption, TKey extends string | undefined>({
  label,
  value,
  onChange,
  options,
  required,
  className,
}: Props<TOption, TKey>) => {
  const id = useMemo(() => `choicegroup-${idCounter++}`, []);
  return (
    <Stack className={className}>
      {label != null && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <FluentChoiceGroup
        id={id}
        selectedKey={value}
        onChange={(_, o) => onChange(o as unknown as TOption)}
        options={options}
      />
    </Stack>
  );
};
