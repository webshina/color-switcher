import { GuildItem } from '#/common/types/Guild';
import { UserItem } from '#/common/types/User';
import { AnnouncementCard } from './AnnouncementCard';

type Props = {
  guild: GuildItem;
  user?: UserItem | null;
};
export const AnnouncementsToManager: React.FC<Props> = (props) => {
  const isShow =
    props.user &&
    props.guild.managementMembers.some(
      (member) => member.discordId === props.user?.discordId
    ) &&
    props.guild.announcementsToGuildManager?.length > 0;

  return (
    <>
      {isShow && (
        <div className="mx-24 my-12 p-3 bg-slate-900 rounded">
          <div className="flex justify-start items-center overflow-x-auto">
            {props.guild.announcementsToGuildManager.map((announcement) => (
              <>
                <div key={announcement.id} className="m-2">
                  <AnnouncementCard
                    guild={props.guild}
                    announcement={announcement}
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
