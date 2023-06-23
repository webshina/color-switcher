export type ChannelItem = {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  activityLevel: number;
  conversationSummaries?: string[];
  inviteCode: string;
  category: {
    id: number;
    name: string;
  };
};
