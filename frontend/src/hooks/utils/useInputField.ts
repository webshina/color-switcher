import InputField, { InputFieldProps } from '@/components/utils/InputField';
import { useEffect, useState } from 'react';

const useInputField = (props: InputFieldProps) => {
  const [valueState, setValueState] = useState(props.value ?? '');
  useEffect(() => {
    setValueState(props.value);
  }, [props.value]);

  const inputField = InputField({
    ...props,
    value: valueState,
    setValueState,
  });

  return {
    inputField,
    valueState,
    setValueState,
  };
};

export default useInputField;
