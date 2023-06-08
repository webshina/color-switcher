import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

type Props = {
  isChecked: boolean;
};
const CheckCircle: React.FC<Props> = ({ isChecked }) => {
  return (
    <>
      <AiFillCheckCircle size={20} color={isChecked ? '#805ad5' : '#CCC'} />
    </>
  );
};

export default CheckCircle;
