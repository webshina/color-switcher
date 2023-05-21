import CircleImage from '@/components/utils/CircleImage';
import { ImageComponent } from '@/components/utils/ImageComponent';
import React from 'react';
import { DiscordMember } from 'types/DiscordMember';
import { ActivityLevel } from './common/ActiveLevel';

type Props = {
  discordMember: DiscordMember;
};

export const UserProfileCard: React.FC<Props> = (props) => {
  return (
    <div id="user-profile">
      <div className="w-[300px] rounded-xl">
        <div className="flex flex-col items-center bg-gradient-to-br from-discord-purple to-pink-500 rounded-t-xl">
          <div className="h-8" />
          <div className="flex flex-row items-center">
            {/* Name */}
            <div className="flex flex-col">
              <div className="text-xl font-bold">
                {props.discordMember.displayName}
              </div>
              <div className="text-sm">{props.discordMember.userName}</div>
            </div>

            <div className="w-3"></div>

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
        <div className="flex flex-col items-start px-8 py-5 bg-dark-light rounded-b-xl text-white">
          <div className="h-12" />

          {/* Description */}
          <div className="text-[12px] font-light">
            {props.discordMember.description}
          </div>
          <div className="h-4" />

          {/* Active */}
          <ActivityLevel level={props.discordMember.activityLevel} />
          <div className="h-4" />

          {/* Joined At */}
          <div className="text-xs font-semibold">メンバーになった日</div>
          <div className="h-1" />
          <div className="text-xs font-light">
            {props.discordMember.joinedAtServer}
          </div>
          <div className="h-4" />

          {/* Role */}
          <div className="text-xs font-semibold">ロール</div>
          <div className="h-1" />
          <div className="flex flex-wrap">
            {props.discordMember.roles.map((role) => (
              <div
                key={role}
                className="flex items-center m-[1px] px-2 py-1 rounded-md bg-slate-700 text-xs font-medium"
              >
                <div className="h-3 w-3 bg-green-500 rounded-full" />
                <div className="w-1" />
                {role}
              </div>
            ))}
          </div>
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
};
