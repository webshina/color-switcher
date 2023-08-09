import { UserItem } from '#/common/types/User';
import { FetchGuildResponse } from '#/common/types/apiResponses/GuildControllerResponse';
import { DiscordConnectBtn } from '@/components/common/DiscordConnectBtn';
import CircleImage from '@/components/utils/CircleImage';
import { ImageComponent } from '@/components/utils/ImageComponent';
import Title from '@/components/utils/Title';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoChatbubblesSharp } from 'react-icons/io5';
import { MdManageAccounts } from 'react-icons/md';
import { Announcements } from './Announcements';
import { Channels } from './Channels';
import { ManagementMembers } from './ManagementMembers';
import { Members } from './Members';
import { ShareButton } from './ShareButton';
import { TagCards } from './TagCards';

type Props = {
  guild: FetchGuildResponse;
  user?: UserItem | null;
};
export const GuildHomePage: React.FC<Props> = (props) => {
  return (
    <div className="lg:mx-24">
      {/* Private icon */}
      {props.guild.isPrivate && (
        <>
          <div className="flex flex-col items-center p-16 bg-dark-light rounded-lg">
            <div className="text-xl">Private community</div>
            <div className="h-8" />
            <ImageComponent
              imgSrc="/images/undraw_security_re_a2rk.svg"
              height={130}
              width={130}
            />
            <div className="h-12" />
          </div>
          <div className="h-12" />
        </>
      )}

      {(!props.guild.isPrivate || props.guild.isManager) && (
        <>
          {/* Cover Image */}
          <div className="relative h-60 w-full">
            <Image
              src={props.guild.coverImageUrl ?? '/images/no_image.jpeg'}
              alt="cover"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute bottom-0 left-10 translate-y-1/2">
              <CircleImage
                imgSrc={props.guild.iconURL ?? '/images/no_image.jpeg'}
                width={100}
                height={100}
              />
            </div>
          </div>

          {/* Share button */}
          <div className="flex justify-end my-5 mr-3">
            <ShareButton message={props.guild.shareMessage ?? ''} />
          </div>

          {/* Channel name */}
          <div className="text-2xl lg:text-5xl font-bold">
            {props.guild.name}
          </div>
          <div className="h-8" />

          {/* Tags */}
          {props.guild.tags && props.guild.tags.length > 0 && (
            <TagCards tagNames={props.guild.tags.map((tag) => tag.name)} />
          )}
          <div className="h-8" />

          {/* Description */}
          <div className="bg-slate-800 p-5 rounded-xl text-sm lg:text-base font-light whitespace-pre-wrap">
            {props.guild.description ?? ''}
          </div>
          <div className="h-16" />

          {/* Management Team */}
          <Title
            title={'Management Team'}
            icon={<MdManageAccounts color="white" />}
          />
          <div className="h-8" />
          <ManagementMembers members={props.guild.managementMembers} />
          <div className="h-16" />

          {/* Announcements */}
          <Announcements guildId={props.guild.id} />
          <div className="h-16" />

          {/* Channel list */}
          {props.guild.categories && props.guild.categories.length > 0 && (
            <>
              <Title
                title={'Channels'}
                icon={<IoChatbubblesSharp color="white" />}
              />
              <div className="h-8" />
              <Channels guild={props.guild} />
              <div className="h-16" />
            </>
          )}

          {/* Member list */}
          <Title title={'Members'} icon={<BsFillPeopleFill color="white" />} />
          <div className="h-8" />
          {props.guild.isMember ? (
            <Members guildId={props.guild.id} />
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
              {!props.user && <DiscordConnectBtn />}
              {props.user && !props.guild.isMember && (
                <div className="text-xl">Join this community !</div>
              )}
            </div>
          )}
          <div className="h-8" />

          <div className="h-16" />
        </>
      )}
    </div>
  );
};
