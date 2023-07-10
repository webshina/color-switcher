import { DiscordConnectBtn } from '@/components/common/DiscordConnectBtn';
import CircleImage from '@/components/utils/CircleImage';
import { ImageComponent } from '@/components/utils/ImageComponent';
import Title from '@/components/utils/Title';
import { useGuild } from '@/hooks/repository/useGuild';
import { useMe } from '@/hooks/repository/useMe';
import Image from 'next/image';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillSetting } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoChatbubblesSharp } from 'react-icons/io5';
import { MdManageAccounts } from 'react-icons/md';
import { Channels } from './Channels';
import { Members } from './Members';
import { ShareButton } from './ShareButton';
import { TagCards } from './TagCards';

type Props = {
  guildId: number;
};
export const GuildHomePage: React.FC<Props> = (props) => {
  const router = useRouter();
  const { data: guild } = useGuild({ guildId: props.guildId });
  const { data: user } = useMe();
  const isOwner = guild?.managementMembers.some(
    (member) => member.discordId === user?.discordId
  );

  return (
    <>
      {guild && (
        <>
          {/* Cover Image */}
          <div className="relative h-60 w-full">
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

            {/* Management button */}
            {isOwner && (
              <div className="absolute top-0 right-0 m-2">
                <button
                  className="flex items-center px-4 py-2 text-lg bg-slate-800 rounded-xl border-2 border-slate-700"
                  onClick={() => {
                    router.push(`/guild/${guild.id}/management`);
                  }}
                >
                  <AiFillSetting />
                  <div className="w-1" />
                  Management
                </button>
              </div>
            )}
          </div>

          {/* Share button */}
          <div className="flex justify-end my-5 mr-3">
            <ShareButton message={guild.shareMessage ?? ''} />
          </div>

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
          {guild.categories && guild.categories.length > 0 && (
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
          <Title title={'Members'} icon={<BsFillPeopleFill color="white" />} />
          <div className="h-8" />
          {guild.isMember ? (
            guild.members && guild.members.length > 0 ? (
              <Members discordMembers={guild.members} />
            ) : (
              <div>No members ...</div>
            )
          ) : (
            <div className="flex flex-col items-center p-16 bg-dark-light rounded-lg">
              <div className="text-xl">Only visible to community members</div>
              <div className="h-8" />
              <ImageComponent
                imgSrc="/images/login.svg"
                height={130}
                width={130}
              />
              <div className="h-12"></div>
              {!user && <DiscordConnectBtn />}
              {user && !guild.isMember && (
                <div className="text-xl">Join this community !</div>
              )}
            </div>
          )}
          <div className="h-8" />

          <div className="h-16" />
        </>
      )}
    </>
  );
};
