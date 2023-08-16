import {
  Checkbox,
  CheckboxGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  VStack,
} from '@chakra-ui/react';
import React, { KeyboardEventHandler, ReactNode, useState } from 'react';
import { BiShow } from 'react-icons/bi';

type BasicProps = {
  id?: string;
  label?: ReactNode;
  trailingIcon?: ReactNode;
  value?: any;
  setValueState?: (value: any) => void;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onKeydown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  disabled?: boolean;
};
type TextProps = BasicProps & {
  type: 'text';
};
type PasswordProps = BasicProps & {
  type: 'password';
};
type TextAreaProps = BasicProps & {
  type: 'textarea';
  rows?: number;
};
type SelectProps = BasicProps & {
  type: 'select';
  placeholder?: string;
  options: {
    label: string;
    value: any;
  }[];
};
type CheckboxProps = BasicProps & {
  type: 'checkbox';
  description: string;
};
type CheckboxListProps = BasicProps & {
  type: 'checkboxList';
  options: {
    id?: string;
    label: string;
    value: number | string;
  }[];
};
type NumberProps = BasicProps & {
  type: 'number';
  min?: number;
  max?: number;
};
export type InputFieldProps =
  | TextProps
  | PasswordProps
  | TextAreaProps
  | SelectProps
  | CheckboxProps
  | CheckboxListProps
  | NumberProps;

const InputField: React.FC<InputFieldProps> = (props) => {
  const [typeState, setTypeState] = useState(props.type);

  return (
    <div className="flex flex-col items-start w-full">
      {/* Label */}
      {props.label && (
        <div className="flex items-center mb-2">
          <div className="text-xs">{props.label}</div>
          <div className="w-3" />
          <div>{props.trailingIcon}</div>
        </div>
      )}

      {/* Input */}
      <div className="w-full flex items-center relative">
        {/* Text */}
        {(props.type === 'text' || props.type === 'password') && (
          // Input Field
          <input
            id={props.id}
            type={typeState}
            value={props.value}
            onChange={(e) => {
              props.setValueState && props.setValueState(e.target.value);
              props.onChange && props.onChange(e);
            }}
            onKeyDown={props.onKeydown}
            className="px-3 py-1 w-full border-[1px] border-gray-300 rounded"
            disabled={props.disabled}
          />
        )}

        {/* Password visibility toggle button */}
        {props.type === 'password' && (
          <button
            className="absolute right-3"
            onClick={() => {
              if (typeState == 'password') {
                setTypeState('text');
              } else {
                setTypeState('password');
              }
            }}
          >
            <BiShow size={20} color="gray" />
          </button>
        )}

        {/* Textarea */}
        {props.type === 'textarea' && (
          // Text area
          <textarea
            id={props.id}
            value={props.value}
            onChange={(e) => {
              props.setValueState && props.setValueState(e.target.value);
              props.onChange && props.onChange(e);
            }}
            rows={props.rows}
            className="px-3 py-1 w-full border-[1px] rounded"
            style={{
              backgroundColor: props.disabled ? '#111' : '#222',
              color: props.disabled ? '#777' : '#fff',
              borderColor: props.disabled ? '#333' : '#ddd',
            }}
            disabled={props.disabled}
          />
        )}

        {/* Select */}
        {props.type === 'select' && (
          <Select
            id={props.id}
            value={props.value}
            disabled={props.disabled}
            placeholder="Select ..."
            onChange={(e) => {
              props.setValueState && props.setValueState(e.target.value);
              props.onChange && props.onChange(e);
            }}
          >
            <>
              {props.options.map((option) => {
                return (
                  <option
                    key={option.label}
                    value={option.value}
                    style={{
                      backgroundColor: props.disabled ? '#111' : '#222',
                      color: props.disabled ? '#777' : '#fff',
                    }}
                  >
                    {option.label}
                  </option>
                );
              })}
            </>
          </Select>
        )}

        {/* Checkbox */}
        {props.type === 'checkbox' && (
          <Checkbox
            id={props.id}
            isChecked={props.value}
            onChange={(e) => {
              props.setValueState && props.setValueState(e.target.checked);
            }}
          >
            {props.description}
          </Checkbox>
        )}

        {/* CheckboxList */}
        {props.type === 'checkboxList' && (
          <CheckboxGroup
            onChange={(checkedItems) => {
              props.setValueState && props.setValueState(checkedItems);
            }}
            value={props.value}
          >
            <VStack align="start">
              {props.options.map((option) => (
                <Checkbox
                  value={option.value}
                  key={option.label}
                  id={option.label}
                >
                  {option.label}
                </Checkbox>
              ))}
            </VStack>
          </CheckboxGroup>
        )}

        {/* Number */}
        {props.type === 'number' && (
          <NumberInput
            id={props.id}
            defaultValue={props.value}
            onChange={(value) => {
              props.setValueState && props.setValueState(value);
            }}
            min={props.min}
            max={props.max}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        )}
      </div>
    </div>
  );
};

export default InputField;
