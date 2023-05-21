export type DiscordMember = {
  id: number;
  displayName: string;
  userName: string;
  imgURL: string;
  activityLevel: number;
  joinedAtServer: string;
  roles: string[];
  description: string;
  isBot: boolean;
};
