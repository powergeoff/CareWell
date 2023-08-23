import { Label, Stack, Checkbox as FluentCheckbox } from '@fluentui/react';
import React, { useMemo } from 'react';

interface Props {
  label?: React.ReactNode;
  value: boolean | undefined | null;
  onChange: (o: boolean) => void;
  required?: boolean;
  className?: string;
}

let idCounter = 0;

export const Checkbox: React.FC<Props> = ({ label, value, onChange, required, className }) => {
  const id = useMemo(() => `checkbox-${idCounter++}`, []);
  return (
    <Stack className={className} horizontal verticalAlign="center">
      <FluentCheckbox
        id={id}
        checked={value ?? false}
        onChange={(_, value) => onChange(value ?? false)}
      />
      {label != null && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
    </Stack>
  );
};
