import { ChannelItem } from './Channel';

export type Category = {
  id: number;
  name: string;
  channels: ChannelItem[];
};
