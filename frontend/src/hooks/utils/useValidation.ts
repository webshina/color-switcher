import { useEffect, useState } from 'react';

type Option = {
  name: string;
  value: any;
  required?: boolean;
  max?: number;
  min?: number;
  email?: boolean;
  custom?: {
    result: boolean;
    message: string;
  };
};

type ValidationResult = {
  isValid: boolean;
  message: string;
};
export type ValidationResults = { [name: string]: ValidationResult };

export const validationMessages = {
  required: '必須です',
  invalidFormat: '正しい形式ではありません',
};

const useValidate = (options: Option[]) => {
  const [validationResults, setValidationResults] = useState<ValidationResults>(
    {}
  );
  const [revalidateTrigger, setRevalidateTrigger] = useState(0);

  const setValidationResult = (name: string, result: ValidationResult) => {
    setValidationResults((prevState) => {
      return { ...prevState, [name]: result };
    });
  };

  const setInvalid = (name: string, message: string) => {
    setValidationResult(name, {
      isValid: false,
      message: message,
    });
  };

  const isValidAll = () => {
    let isValidAll = true;
    for (const key of Object.keys(validationResults)) {
      if (!validationResults[key].isValid) {
        isValidAll = false;
      }
    }
    return isValidAll;
  };

  const revalidate = () => {
    setRevalidateTrigger(revalidateTrigger + 1);
  };

  // Validation Func
  const validate = (option: Option) => {
    // Initialize
    setValidationResult(option.name, {
      isValid: true,
      message: '',
    });

    // Required check
    if (
      option.required &&
      (option.value == null || option.value == '' || option.value == undefined)
    ) {
      setInvalid(option.name, validationMessages.required);
      return;
    }

    // Min check
    if (option.min && option.value && option.value.length < option.min) {
      setInvalid(option.name, `最低${option.min}文字必要です`);
      return;
    }

    // Max check
    if (option.max && option.value && option.value.length > option.max) {
      setInvalid(option.name, `最大${option.max}文字までです`);
      return;
    }

    // E-mail format check
    if (
      option.email &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(option.value)
    ) {
      setInvalid(option.name, validationMessages.invalidFormat);
      return;
    }

    // Custom check
    if (option.custom && !option.custom.result) {
      setInvalid(option.name, option.custom.message);
      return;
    }
  };

  // Define useEffect individually
  for (let option of options) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(
      () => {
        validate(option);
      },
      [option.value, revalidateTrigger] // deps for useEffect
    );
  }

  return { validationResults, isValidAll, revalidate };
};

export default useValidate;
