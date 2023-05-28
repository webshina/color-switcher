type Props = {
  level: number;
};
export const ActivityLevel: React.FC<Props> = (props) => {
  return (
    <div className="px-3 py-2 rounded-md bg-slate-800 text-xs">
      Active : {props.level === 0 ? '💤' : Array(props.level).fill('🔥')}
    </div>
  );
};
