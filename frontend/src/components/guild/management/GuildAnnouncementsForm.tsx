import { GuildItem } from '#/common/types/Guild';
import Title from '@/components/utils/Title';
import { post } from '@/utils/apiHelper';
import { useToast } from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import { AnnouncementCard } from '../homePage/AnnouncementCard';

type Props = {
  guild: GuildItem;
};
export const GuildAnnouncementsForm: React.FC<Props> = (props) => {
  const toast = useToast();

  const save = async () => {
    try {
      await post(`/api/guild/update/${props.guild.id}`, {});
      toast({
        status: 'success',
        description: 'Saved',
      });
    } catch (error) {
      toast({
        status: 'error',
        description: 'Failed',
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Title title="Announcements" />
      <div className="h-5" />
      {props.guild.announcements.map((announcement, index) => (
        <div key={index} className="m-2">
          <AnnouncementCard
            guildId={props.guild.id}
            announcement={announcement}
            editable
          />
        </div>
      ))}
    </>
  );
};
