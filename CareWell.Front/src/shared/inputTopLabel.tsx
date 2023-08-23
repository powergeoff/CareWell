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
  autoComplete?: string;
}

let idCounter = 0;

export const InputTopLabel: React.FC<Props> = ({
  label,
  value,
  onChange,
  required,
  onKeyDown,
  className,
  type,
  autoComplete,
}) => {
  const id = useMemo(() => `input-${idCounter++}`, []);
  return (
    <Stack className={className}>
      {label != null && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <TextField
        id={id}
        type={type}
        value={value ?? ''}
        autoComplete={autoComplete}
        onKeyDown={onKeyDown}
        underlined
        onChange={(_, value) => onChange(value ?? '')}
      />
    </Stack>
  );
};
