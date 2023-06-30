import { ChannelCategoryItem, ChannelItem } from '#/common/types/Channel';
import { GuildItem } from '#/common/types/Guild';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { ActivityLevel } from '../common/ActiveLevel';
import { JumpChannelBtn } from '../common/JumpChannelBtn';
import ImageCard from '../utils/ImageCard';

type Props = {
  guild: GuildItem;
};
export const Channels: React.FC<Props> = (props) => {
  const categories: (ChannelCategoryItem & {
    channels: ChannelItem[];
  })[] = [];
  props.guild.channels.map((channel) => {
    if (!categories.some((category) => category.id === channel.categoryId)) {
      categories.push({
        ...channel.category!,
        channels: [],
      });
    }
  });
  // Add channels to each category
  categories.map((category) => {
    category.channels = [];
    props.guild.channels.map((channel) => {
      if (channel.categoryId === category.id) {
        category.channels.push(channel);
      }
    });
  });
  return (
    <Accordion
      defaultIndex={Array.from({ length: categories.length }, (v, k) => k)} // Open all accordions
      allowMultiple
    >
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
            <div className="h-1" />
            <div className="flex flex-wrap">
              {category.channels.map((channel) => (
                <div key={channel.id}>
                  {channel.activityScore! >= 0 ? (
                    // High activity level
                    <>
                      <div key={channel.id} className="m-1">
                        <ImageCard
                          imgSrc={channel.imageURL!}
                          title={channel.name}
                          subTitle={channel.topic}
                          width={350}
                        >
                          <div className="mx-1 my-3">
                            {/* Active level */}
                            <ActivityLevel level={channel.activityScore!} />
                            <div className="h-5" />
                            {/* Conversation Summary */}
                            <div className="text-sm font-semibold">
                              AI Summary
                            </div>
                            <div className="h-3" />
                            <div className="p-4 h-48 overflow-auto rounded-md bg-slate-800">
                              {channel.summaries.map((summary) => {
                                return (
                                  <div
                                    key={summary.id}
                                    className="my-1 p-3 rounded-md bg-white/10 text-sm"
                                  >
                                    {summary.content}
                                  </div>
                                );
                              })}
                            </div>
                            <div className="h-5" />
                            {/* Go to channel */}
                            <div className="flex justify-end">
                              <JumpChannelBtn
                                guildDiscordId={props.guild.discordId}
                                channelDiscordId={channel.discordId}
                              />
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
                          {channel.topic}
                        </div>
                        <div className="h-3" />
                        <ActivityLevel level={channel.activityScore!} />
                        <div className="h-3" />
                        <div className="absolute bottom-4 right-5">
                          {/* <JumpChannelBtn inviteCode={channel.inviteCode} /> */}
                        </div>
                      </div>
                    </>
                  )}
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
