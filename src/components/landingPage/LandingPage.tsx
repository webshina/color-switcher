import { useScreenSize } from '@/hooks/utils/useScreenSize';
import { Logo } from '../common/Logo';
import { Discord3DModel } from './Discord3DModel';

type Props = {};
export const LandingPage: React.FC<Props> = () => {
  const screenSize = useScreenSize();
  console.log(screenSize);
  const classHeading =
    'flex justify-center text-5xl font-bold text-center leading-normal gradient-text-white-to-dark ' +
    (screenSize === 'sm' ? 'text-xl' : 'text-5xl');
  return (
    <>
      {/* Top */}
      <div className="relative flex justify-center h-screen w-full">
        <div className="absolute h-full w-full z-10">
          <Discord3DModel />
        </div>
        <div className="flex flex-col items-center mt-[250px] lg:mt-[300px]">
          <Logo size={80} twinkle />
          <div className="h-[100px]" />
          <div className="m-2 text-3xl text-center font-light text-shadow leading-10">
            Generate your
            <br />
            Discord home page
            <br />
            in <span className="font-bold">ONE</span> click !
          </div>
        </div>
      </div>

      {/* Service Image */}
      <div className={classHeading}>
        Organize hard-to-see Discord server channels
        <br />
        and members into a beautiful home page
      </div>
      {/* ScreenShots */}
      <div></div>
      <div className="h-16" />
      {/* How to use */}
      <div className={classHeading}>
        All you need to do is install Bot of Discord
      </div>
      <div className="h-16" />
      <div className={classHeading}>Whatever it is, let's make it first!</div>
    </>
  );
};
