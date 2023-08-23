import {
  defaultDatePickerStrings,
  IDatePickerStrings,
  Label,
  DatePicker as FluentDatePicker,
  Stack,
} from '@fluentui/react';
import React, { useCallback, useMemo } from 'react';

import { DateTime } from '@/utils/dateTime';
import { isNotEmpty } from '@/utils/empty';

interface Props {
  className?: string;
  label?: React.ReactNode;
  required?: boolean;
  maxDate?: Date;
  minDate?: Date;
  placeholder?: Date | string;
  selfValidation?: boolean;
  validationText?: string;
  onSelectDateHandler: (x?: Date | null) => void;
}

let idCounter = 0;
let validationErrorStrings: IDatePickerStrings | undefined = undefined;

export const DatePicker: React.FC<Props> = ({
  className,
  label,
  required,
  maxDate,
  minDate,
  placeholder,
  selfValidation,
  validationText,
  onSelectDateHandler,
}) => {
  const id = useMemo(() => `datepicker-${idCounter++}`, []);
  const formatDate = useCallback((date?: Date | undefined) => DateTime.format(date, 'date'), []);

  const placeholderText = typeof placeholder === 'string' ? placeholder : undefined;
  const placeholderDate = placeholder instanceof Date ? placeholder : undefined;

  if (selfValidation && isNotEmpty(validationText)) {
    validationErrorStrings = {
      ...defaultDatePickerStrings,
      isRequiredErrorMessage: validationText,
    };
  }

  return (
    <Stack id="Date-Picker" className={className}>
      {label != null && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <FluentDatePicker
        id={id}
        formatDate={formatDate}
        isRequired={selfValidation}
        minDate={minDate ?? undefined}
        maxDate={maxDate ?? undefined}
        placeholder={placeholderText}
        underlined
        value={placeholderDate}
        strings={validationErrorStrings}
        onSelectDate={onSelectDateHandler}
      />
    </Stack>
  );
};
