import {
  GuildItem,
  NotificationToGuildManagerItem,
} from '#/common/types/Guild';
import useInputField from '@/hooks/utils/useInputField';
import { post } from '@/utils/apiHelper';
import { Button, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { BiCopy } from 'react-icons/bi';
import { mutate } from 'swr';

type Props = {
  notification: NotificationToGuildManagerItem;
  guild: GuildItem;
};
export const NotificationCard: React.FC<Props> = (props) => {
  const toasts = useToast();

  const title = () => {
    let title = '';
    if (props.notification.name === 'INSTRUCTION_FOR_POST_TO_CHANNEL') {
      if (props.guild.language === 'Japanese') {
        title = 'このページをDiscordでお知らせしましょう !';
      } else {
        title = 'Notify this page in Discord !';
      }
    } else if (
      props.notification.name === 'INSTRUCTION_FOR_POST_TO_SOCIAL_MEDIA'
    ) {
      if (props.guild.language === 'Japanese') {
        title = 'このページをSNSで紹介しましょう !';
      } else {
        title = 'Notify this page in Social media !';
      }
    }
    return title;
  };

  const image = () => {
    if (props.notification.name === 'INSTRUCTION_FOR_POST_TO_CHANNEL') {
      return (
        <div className="relative">
          <div className="absolute top-10 right-3 z-10 text-lg text-red-500 font-bold text-center">
            Copy & Share !
          </div>
          <div className="relative h-[200px] w-full">
            <Image
              src={'/images/notificationImages/notify_in_discord.png'}
              alt="image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      );
    } else if (
      props.notification.name === 'INSTRUCTION_FOR_POST_TO_SOCIAL_MEDIA'
    ) {
      return (
        <div className="my-5">
          <div className="relative h-[140px] w-full">
            <Image
              src={
                '/images/notificationImages/undraw_share_opinion_re_4qk7.svg'
              }
              alt="image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      );
    }
  };

  const initMessage = () => {
    let message = '';
    if (props.notification.name === 'INSTRUCTION_FOR_POST_TO_CHANNEL') {
      if (props.guild.language === 'Japanese') {
        message = `- このコミュニティに入ったばかりの方
- コミュニティの最近の活動が知りたい方
- このコミュニティにどんな人がいるのか知りたい方

このDiscordサーバーの概要ページを用意しています。

まずはここを覗いてみましょう！

URL : ${process.env.NEXT_PUBLIC_APP_URL}/guild/${props.guild.discordId}`;
      } else {
        message = `- You are new to this community ?
- Want to know what the community has been up to lately?
- You want to know what kind of people are in this community ?

We have an overview page for this Discord server.

Take a look here first!

URL : ${process.env.NEXT_PUBLIC_APP_URL}/guild/${props.guild.id}`;
      }
    } else if (
      props.notification.name === 'INSTRUCTION_FOR_POST_TO_SOCIAL_MEDIA'
    ) {
      message = props.guild.shareMessage ?? '';
    }

    return message;
  };

  const { inputField: messageInputField, valueState: message } = useInputField({
    id: 'message',
    type: 'textarea',
    value: initMessage(),
    rows: 7,
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    toasts({
      title: 'Copied!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const done = async () => {
    try {
      await post(
        `/api/guild/${props.guild.id}/notification-to-manager/${props.notification.id}`,
        {
          isShow: false,
        }
      );
      await mutate('useGuild');
      toasts({
        description: 'Thank you for your hard work !',
        status: 'success',
      });
    } catch (error) {
      toasts({
        description: 'Error',
        status: 'error',
      });
    }
  };

  return (
    <div className="overflow-y-hidden hover:overflow-y-auto">
      <div className="px-3 py-3 font-bold text-sm bg-slate-700 rounded-t-xl">
        {title()}
      </div>
      <div className="p-3 bg-slate-600 rounded-b-xl">
        <div className="h-1" />
        {image()}
        <div className="h-1" />

        <div className="flex justify-end">
          <Button colorScheme="pink" opacity={0.9} onClick={copyToClipboard}>
            <BiCopy />
            <div className="w-1" />
            Copy
          </Button>
        </div>
        <div className="relative flex-1">{messageInputField}</div>
        <div className="h-5" />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-purple-600 rounded font-bold"
            onClick={() => {
              done();
            }}
          >
            Done !
          </button>
        </div>
        <div className="h-12" />
      </div>
    </div>
  );
};
