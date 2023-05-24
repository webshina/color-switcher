type Props = {
  size?: number;
  twinkle?: boolean;
};
export const Logo: React.FC<Props> = (props) => {
  return (
    <div
      className="neon font-[200]"
      style={{
        fontSize: props.size ?? 20,
      }}
    >
      Di<span className={props.twinkle ? 'twinkle' : ''}>sc</span>ord H
      <span className={props.twinkle ? 'twinkle' : ''}>O</span>ME
    </div>
  );
};
