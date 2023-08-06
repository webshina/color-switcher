import { LoadingSpinner } from '@/components/utils/LoadingSpinner';
import 'react-datepicker/dist/react-datepicker.css';
import { animated, useSpring } from 'react-spring';

type Props = {
  progressRate: number;
};
export const GuildBatchProgress: React.FC<Props> = (props) => {
  const springStyle = useSpring({
    from: { width: '0%' },
    to: { width: `${props.progressRate * 100}%` },
    config: { duration: 1000 },
  });

  return (
    <div className="flex flex-col items-center p-8 bg-slate-800 rounded-xl">
      <div className="">
        Generating your <span className="font-bold">Discord HOME</span>...
      </div>
      <div className="h-2" />
      <div className="flex items-center">
        <div className="w-[250px] h-[15px] bg-slate-700 rounded">
          <animated.div
            className="h-full gradient-bg-purple-to-pink rounded"
            style={springStyle}
          ></animated.div>
        </div>
        <div className="w-2" />
        <LoadingSpinner />
      </div>
      <div className="h-2" />
      <div>{(props.progressRate * 100).toFixed(0)}%</div>
    </div>
  );
};
