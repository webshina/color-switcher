import { ActivityLevel } from '@/components/common/ActiveLevel';
import { JumpChannelBtn } from '@/components/common/JumpChannelBtn';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import ImageCard from '../utils/ImageCard';
import { ChannelItem } from './types/Channel';

type Props = {
  channels: ChannelItem[];
};
export const Channels: React.FC<Props> = (props) => {
  const categories: any[] = [];
  props.channels.map((channel) => {
    if (!categories.some((category) => category.id === channel.category.id)) {
      categories.push(channel.category);
    }
  });

  // Add channels to each category
  categories.map((category) => {
    category.channels = [];
    props.channels.map((channel) => {
      if (channel.category.id === category.id) {
        category.channels.push(channel);
      }
    });
  });

  return (
    <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
      {categories.map((category) => (
        <AccordionItem key={category.id}>
          <h2>
            <AccordionButton className="bg-slate-800">
              <Box as="span" flex="1" textAlign="left">
                <div className="text-2xl font-bold">{category.name}</div>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p={0} pb={4}>
            <div className="flex flex-wrap">
              {category.channels.map((channel: any) => (
                <>
                  {channel.activityLevel > 3 ? (
                    // High activity level
                    <>
                      <div key={channel.id} className="m-1">
                        <ImageCard
                          imgSrc={channel.imageUrl}
                          title={channel.name}
                          subTitle={channel.description}
                          width={350}
                        >
                          <div className="mx-1 my-3">
                            {/* Active level */}
                            <ActivityLevel level={channel.activityLevel} />
                            <div className="h-5" />

                            {/* Conversation Summary */}
                            <div className="text-sm font-semibold">
                              AI Summary
                            </div>
                            <div className="h-3" />
                            <div className="p-4 h-48 overflow-auto rounded-md bg-slate-800">
                              {channel.conversationSummaries.map(
                                (summary: string, index: number) => {
                                  return (
                                    <div key={index}>
                                      <div className="p-3 rounded-md bg-white/10 text-sm">
                                        {summary}
                                      </div>
                                      <div className="h-1" />
                                    </div>
                                  );
                                }
                              )}
                            </div>
                            <div className="h-5" />

                            {/* Go to channel */}
                            <div className="flex justify-end">
                              <JumpChannelBtn inviteCode={channel.inviteCode} />
                            </div>

                            <div className="h-3" />
                          </div>
                        </ImageCard>
                      </div>
                    </>
                  ) : (
                    // Low activity level
                    <>
                      <div
                        key={channel.id}
                        className="relative m-1 p-3 h-[200px] w-[170px] bg-slate-700 rounded-xl text-xl"
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
                    </>
                  )}
                </>
              ))}
            </div>
          </AccordionPanel>
          <div className="h-8" />
        </AccordionItem>
      ))}
    </Accordion>
  );
};
