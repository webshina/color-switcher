import { GuildMemberItem } from '#/common/types/GuildMember';
import CircleImage from '@/components/utils/CircleImage';
import { ImageComponent } from '@/components/utils/ImageComponent';
import React from 'react';
import { ActivityLevel } from './common/ActiveLevel';

type Props = {
  discordMember: GuildMemberItem;
};

export const UserProfile: React.FC<Props> = (props) => {
  return (
    <div id="user-profile" className="w-[320px] rounded-xl">
      <div className="flex flex-col items-center bg-gradient-to-br from-discord-purple to-pink-500 rounded-t-xl">
        <div className="h-6" />
        <div className="flex flex-row justify-center items-start">
          {/* Name */}
          <div className="flex flex-col">
            <div className="text-base font-bold">
              {props.discordMember.displayName}
            </div>
            <div className="text-sm">{props.discordMember.userName}</div>
          </div>

          <div className="w-3" />

          {/* Discord icon */}
          <button className="p-1 rounded-full bg-white">
            <div className="relative h-7 w-7">
              <ImageComponent
                imgSrc="/images/snsIcons/Discord.svg"
                height={28}
                width={28}
              />
            </div>
          </button>
          <div className="w-1" />

          {/* Social media icon */}
          {props.discordMember.socialMedias.map((socialMedia) => (
            <button className="p-1 rounded-full bg-white">
              <div className="relative h-7 w-7">
                <ImageComponent
                  imgSrc={`/images/snsIcons/${socialMedia.name}.png`}
                  height={28}
                  width={28}
                  objectFit="contain"
                />
              </div>
            </button>
          ))}
        </div>
        <div className="h-3" />

        {/* User image */}
        <div className="h-[50px]">
          <div className="p-[0.1px] bg-dark-light rounded-full">
            {props.discordMember.imgURL && (
              <CircleImage
                imgSrc={props.discordMember.imgURL}
                width="100px"
                height="100px"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start px-8 py-5 h-[250px] bg-dark-light rounded-b-xl text-white">
        <div className="h-20" />

        {/* Description */}
        <div className="h-[80px] overflow-y-auto text-[12px] font-light">
          {props.discordMember.description}
        </div>
        <div className="h-4" />

        {/* Active */}
        <ActivityLevel level={props.discordMember.activityLevel} />
        <div className="h-8" />

        {/* Joined At */}
        <div className="text-xs">
          <span className=" font-semibold">Joined at:</span>{' '}
          {props.discordMember.joinedAtServer}
        </div>
        <div className="h-8" />

        {/* Role */}
        <div className="text-xs font-semibold">Roles</div>
        <div className="h-1" />
        <div className="flex flex-wrap h-[50px]">
          {props.discordMember.roles.map((role) => (
            <div
              key={role}
              className="flex items-center m-[1px] px-2 py-1 h-[25px] rounded-md bg-slate-700 text-xs font-medium"
            >
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <div className="w-1" />
              {role}
            </div>
          ))}
        </div>
        <div className="h-1" />
      </div>
    </div>
  );
};
