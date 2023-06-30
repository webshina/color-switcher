import { BsDiscord } from 'react-icons/bs';

type Props = {
  guildDiscordId: string;
  channelDiscordId: string;
};
export const JumpChannelBtn: React.FC<Props> = (props) => {
  return (
    <a
      href={`https://discord.com/channels/${props.guildDiscordId}/${props.channelDiscordId}`}
      target="_blank"
      rel="noreferrer"
    >
      <button className="flex items-center px-4 py-2 text-white gradient-bg-discord-purple-to-blue rounded-md">
        <BsDiscord size={20} />
        <div className="w-2" />
        <div className="text-sm font-semibold">Go !!!</div>
      </button>
    </a>
  );
};
