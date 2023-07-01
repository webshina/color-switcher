import { FaSave } from 'react-icons/fa';

type Props = {
  onClick: () => void;
  disabled?: boolean;
};
export const SaveBtn: React.FC<Props> = (props) => {
  return (
    <div
      className="rounded-xl"
      style={{
        backgroundColor: '#000000',
        opacity: props.disabled ? 0.5 : 1,
      }}
    >
      <button
        className="flex items-center px-4 py-2 gradient-bg-purple-to-pink rounded-xl"
        onClick={() => props.onClick()}
        disabled={props.disabled}
      >
        <FaSave />
        <div className="w-1" />
        Save
      </button>
    </div>
  );
};
