import { Label, Stack, TextField } from '@fluentui/react';
import React, { KeyboardEventHandler, useMemo } from 'react';

interface Props {
  label?: React.ReactNode;
  value: string | undefined | null;
  onChange: (o: string) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  required?: boolean;
  className?: string;
  type?: string;
}

let idCounter = 0;

export const Input: React.FC<Props> = ({
  label,
  value,
  onChange,
  required,
  onKeyDown,
  className,
  type,
}) => {
  const id = useMemo(() => `input-${idCounter++}`, []);
  return (
    <Stack className={className}>
      <TextField
        id={id}
        type={type}
        value={value ?? ''}
        onKeyDown={onKeyDown}
        underlined
        onChange={(_, value) => onChange(value ?? '')}
      />
      {label != null && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
    </Stack>
  );
};
