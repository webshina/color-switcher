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
import { ChannelCard } from './ChannelCard';
import { LightChannelCard } from './LightChannelCard';

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
                  {channel.activityScore! >= 2 ? (
                    // High activity level
                    <ChannelCard guild={props.guild} channel={channel} />
                  ) : (
                    // Low activity level
                    <LightChannelCard guild={props.guild} channel={channel} />
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
