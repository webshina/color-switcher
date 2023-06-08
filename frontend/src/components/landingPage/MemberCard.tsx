import Image from 'next/image';
import React from 'react';
import { BsQuestion } from 'react-icons/bs';

type Props = {
  name: string;
  role: string;
  twitterName: string;
  iconURL: string;
};

const MemberCard: React.FC<Props> = ({ name, role, twitterName, iconURL }) => {
  return (
    <>
      <div className="w-[340px] m-2 p-5 bg-gradient-to-br from-indigo-500 to-fuchsia-300 text-white rounded-lg">
        <div className="flex">
          <div>
            <div className="relative h-32 w-32">
              {iconURL ? (
                <Image
                  src={iconURL}
                  alt="image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              ) : (
                <div className="flex flex-col justify-center items-center h-full">
                  <BsQuestion size={100} color={'#FFF'} />
                </div>
              )}
            </div>
          </div>
          <div className="mx-8 flex flex-col justify-start">
            <div className="mb-1 text-xl font-bold">{name}</div>
            <div className="mb-3 text-sm">{role}</div>
            {twitterName && (
              <a
                href={`https://twitter.com/${twitterName}`}
                target="_blank"
                rel="noreferrer"
              >
                <div className="rounded-lg h-10 w-10 p-1 bg-white">
                  <div className="relative h-full w-full ">
                    <Image
                      src="/images/snsIcons/Twitter.png"
                      alt="image"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberCard;
