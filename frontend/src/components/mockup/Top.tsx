import { useScreenSize } from '@/hooks/utils/useScreenSize';
import Image from 'next/image';
import { BsFillRocketTakeoffFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { ImageComponent } from '../utils/ImageComponent';
import Title from '../utils/Title';
import { TagCards } from './TagCards';
import { useGuilds } from './data/useGuilds';

type Props = {};
export const Top: React.FC<Props> = (props) => {
  const categories = useGuilds();
  const screenSize = useScreenSize();

  return (
    <div className="flex flex-col">
      <div className="h-12" />

      {/* Header */}
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-center gradient-text-purple-to-pink">
          Find a community you like !
        </div>
        <ImageComponent
          imgSrc="/images/undraw_adventure_re_ncqp.svg"
          height={200}
          width={200}
          objectFit="contain"
        />
      </div>
      <div className="h-12" />

      {/* Guilds */}
      {categories.map((category) => (
        <div key={category.id}>
          <Title title={category.name} />
          <div className="h-5" />

          {/* Guilds */}
          <div className="flex flex-wrap justify-center lg:justify-start">
            {category.guilds.map((guild) => (
              <>
                <div
                  key={guild.id}
                  className="m-1 rounded-xl border border-dark-light"
                  style={{ width: screenSize === 'lg' ? 450 : 350 }}
                >
                  <div className="relative">
                    {/* Cover Image */}
                    <div className="relative h-[200px]">
                      <Image
                        src={guild.coverImgURL}
                        alt="image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-xl"
                      />
                    </div>

                    {/* Icon Image */}
                    <div className="absolute bottom-0 left-2 transform translate-y-1/2">
                      <div className="p-1 bg-dark rounded-3xl">
                        <Image
                          src={guild.iconImgURL}
                          alt="image"
                          width={80}
                          height={80}
                          objectFit="cover"
                          className="rounded-3xl"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="h-2" />

                  {/* Member Count */}
                  <div className="flex justify-end items-center pr-5">
                    <FaUserFriends />
                    <div className="w-2" />
                    <div className="text-sm">
                      {guild.memberCnt.toLocaleString()}
                    </div>
                  </div>
                  <div className="h-[30px]" />

                  <div className="px-3">
                    {/* Guild name */}
                    <div className="text-xl font-bold">{guild.name}</div>
                    <div className="h-1" />

                    {/* Tags */}
                    {guild.tags && guild.tags.length > 0 && (
                      <TagCards tags={guild.tags} />
                    )}
                    <div className="h-4" />

                    {/* Description */}
                    <div className="h-[200px] p-5 bg-slate-900 rounded-xl overflow-auto whitespace-pre-wrap">
                      {guild.description}
                    </div>
                    <div className="h-5" />

                    {/* Jump Button */}
                    <div className="flex justify-end">
                      <button
                        className="flex items-center px-5 py-2 gradient-bg-discord-purple-to-blue rounded-xl"
                        onClick={() => {
                          window.open(`/mockup/guild/${guild.id}`, '_blank');
                        }}
                      >
                        Go to community
                        <div className="w-2" />
                        <BsFillRocketTakeoffFill />
                      </button>
                    </div>

                    <div className="h-5" />
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="h-16" />
        </div>
      ))}
    </div>
  );
};
