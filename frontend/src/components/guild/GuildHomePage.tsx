import { useGuild } from '@/hooks/repository/useGuild';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoChatbubblesSharp } from 'react-icons/io5';
import { MdManageAccounts } from 'react-icons/md';
import CircleImage from '../utils/CircleImage';
import Title from '../utils/Title';
import { Channels } from './Channels';
import { Members } from './Members';
import { TagCards } from './TagCards';

type Props = {
  guildId: number;
};
export const GuildHomePage: React.FC<Props> = (props) => {
  const { data: guild } = useGuild({ guildId: props.guildId });

  return (
    <>
      {guild && (
        <>
          {/* Cover Image */}
          <div className="relative h-60 w-full bg-gray-200">
            <Image
              src={guild.coverImageUrl ?? '/images/no_image.jpeg'}
              alt="cover"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 left-10 translate-y-1/2">
              <CircleImage
                imgSrc={guild.iconURL ?? '/images/no_image.jpeg'}
                width="100px"
                height="100px"
              />
            </div>
          </div>
          <div className="h-20" />

          {/* Channel name */}
          <div className="text-2xl lg:text-5xl font-bold">{guild.name}</div>
          <div className="h-8" />

          {/* Tags */}
          {guild.tags && guild.tags.length > 0 && (
            <TagCards tagNames={guild.tags.map((tag) => tag.name)} />
          )}
          <div className="h-8" />

          {/* Description */}
          <div className="bg-slate-800 p-5 rounded-xl text-sm lg:text-base font-light whitespace-pre-wrap">
            {guild.description ?? ''}
          </div>
          <div className="h-16" />

          {/* Management Team */}
          <Title
            title={'Management Team'}
            icon={<MdManageAccounts color="white" />}
          />
          <div className="h-8" />
          <Members discordMembers={guild.managementMembers} />
          <div className="h-16" />

          {/* Channel list */}
          {guild.channels && guild.channels.length > 0 && (
            <>
              <Title
                title={'Channels'}
                icon={<IoChatbubblesSharp color="white" />}
              />
              <div className="h-8" />
              <Channels guild={guild} />
              <div className="h-16" />
            </>
          )}

          {/* Member list */}
          {guild.members && guild.members.length > 0 && (
            <>
              <Title
                title={'Members'}
                icon={<BsFillPeopleFill color="white" />}
              />
              <div className="h-8" />
              <Members discordMembers={guild.members} />
              <div className="h-8" />
            </>
          )}

          <div className="h-16" />
        </>
      )}
    </>
  );
};
