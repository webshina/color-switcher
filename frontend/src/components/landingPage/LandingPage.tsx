import { useScreenSize } from '@/hooks/utils/useScreenSize';
import { useRouter } from 'next/router';
import { Logo } from '../common/Logo';
import { ExpandableImage } from '../utils/ExpandableImage';
import { ImageComponent } from '../utils/ImageComponent';
import { Discord3DModel } from './Discord3DModel';
import MemberCard from './MemberCard';

type Props = {};
export const LandingPage: React.FC<Props> = () => {
  const router = useRouter();
  const screenSize = useScreenSize();
  const classHeading =
    'text-5xl font-bold text-center leading-normal gradient-text-white-to-dark whitespace-pre-wrap ' +
    (screenSize === 'sm' ? 'text-xl' : 'text-5xl');
  return (
    <>
      {/* Top */}
      <div className="relative flex justify-center h-[800px] lg:h-[1200px] w-full">
        <div className="absolute h-full w-full z-10">
          <Discord3DModel />
        </div>
        <div className="flex flex-col items-center mt-[250px] lg:mt-[300px]">
          <div className="lg:h-[200px]" />
          <Logo size={80} twinkle />
          <div className="h-[50px] lg:h-[100px]" />
          <div className="m-2 text-3xl text-center font-bold leading-10">
            Generate your
            <br />
            Discord home page
            <br />
            in{' '}
            <span className="gradient-text-purple-to-pink font-bold">
              ONE
            </span>{' '}
            click !
          </div>
        </div>
      </div>

      {/* Service Image */}
      <div className={classHeading}>
        Create a
        <span className="gradient-text-purple-to-pink"> beautiful </span>
        homepage for Discord using{' '}
        <span className="gradient-text-purple-to-pink">AI</span>
      </div>
      <div className="h-16" />
      {/* ScreenShots */}
      <div className="flex flex-wrap justify-center items-center">
        {[
          'screenshotTop.png',
          'screenshotFeaturedChannels.png',
          'screenshotChannels.png',
          'screenshotMembers.png',
        ].map((image) => {
          return (
            <div key={image} className="m-2">
              <ExpandableImage
                imgURL={`/images/landingPage/${image}`}
                width={screenSize === 'lg' ? 240 : 160}
                height={screenSize === 'lg' ? 500 : 340}
              />
            </div>
          );
        })}
      </div>
      <div className="h-56" />

      {/* How to use */}
      <div className={classHeading}>
        All you need to do is{' '}
        <span className="gradient-text-purple-to-pink">ONLY</span> install Bot
        to Discord
      </div>
      <div className="h-24" />
      <div className="flex justify-center">
        <ImageComponent
          imgSrc={`/images/landingPage/installBotToDiscord.svg`}
          width={screenSize === 'lg' ? 800 : 300}
          height={screenSize === 'lg' ? 180 : 60}
          objectFit="contain"
        />
      </div>
      <div className="h-56" />

      <div className={classHeading}>
        {/* Whatever it is, let's make it first! */}
        Coming soon...
      </div>
      <div className="h-16" />
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <button
            className="px-10 py-3 gradient-bg-purple-to-pink rounded-full text-2xl font-bold"
            onClick={() => {
              window.open('/mockup/top', '_blank');
            }}
          >
            🖥 SAMPLE
          </button>
        </div>
      </div>
      <div className="h-36" />

      {/* Member */}
      <div className="my-20 mx-8 flex flex-col items-center">
        <div className={classHeading}>Member</div>
        <div className="my-10 flex flex-wrap">
          <MemberCard
            name={'TAZ'}
            role={'Co-Founder'}
            twitterName={'TAZ_tt_tt'}
            iconURL={'/images/landingPage/taz_icon.jpeg'}
          />
          <MemberCard
            name={'webshina'}
            role={'Co-Founder / Tech Lead'}
            twitterName={'webshina'}
            iconURL={'/images/landingPage/webshina_icon.jpeg'}
          />
        </div>
      </div>

      <div className="h-24" />
    </>
  );
};
