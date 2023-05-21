import { ActivityLevel } from '@/components/common/ActiveLevel';
import { JumpChannelBtn } from '@/components/common/JumpChannelBtn';
import { useServer } from '@/hooks/repository/useServer';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';

type Props = {};
export const Channels: React.FC<Props> = () => {
  const server = useServer({ serverId: '1' });

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {server.categories.map((category) => (
        <AccordionItem key={category.id}>
          <h2>
            <AccordionButton className="bg-slate-800">
              <Box as="span" flex="1" textAlign="left">
                <div className="text-2xl font-bold">{category.name}</div>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <div className="flex flex-wrap">
              {category.channels.map((channel) => (
                <div
                  key={channel.id}
                  className="relative m-2 p-3 h-[200px] w-[180px] bg-slate-700 rounded-xl text-xl"
                >
                  <div className="text-sm font-bold">{channel.name}</div>
                  <div className="h-3" />
                  <div className="h-[40px] overflow-auto text-xs">
                    {channel.description}
                  </div>
                  <div className="h-3" />
                  <ActivityLevel level={channel.activityLevel} />
                  <div className="h-3" />
                  <div className="absolute bottom-4 right-5">
                    <JumpChannelBtn inviteCode={channel.inviteCode} />
                  </div>
                </div>
              ))}
            </div>
          </AccordionPanel>
          <div className="h-8" />
        </AccordionItem>
      ))}
    </Accordion>
  );
};
