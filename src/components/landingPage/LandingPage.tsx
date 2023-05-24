import { Logo } from '../common/Logo';
import { Discord3DModel } from './Discord3DModel';

type Props = {};
export const LandingPage: React.FC<Props> = () => {
  return (
    <div className="relative h-[600px] w-screen">
      <div className="absolute h-full w-full z-10">
        <Discord3DModel />
      </div>
      <div className="absolute top-1/4 lg:top-1/3 left-[10px] lg:left-[400px] flex flex-col items-start">
        <Logo size={80} twinkle />
        <div className="h-8" />
        <div className="m-2 text-3xl font-light text-shadow leading-10">
          Generate your
          <br />
          Discord home page
          <br />
          in <span className="font-bold">ONE</span> click !
        </div>
      </div>
    </div>
  );
};
