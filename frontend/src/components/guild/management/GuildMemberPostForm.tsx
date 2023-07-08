import { GuildMemberItem, GuildPostItem } from '#/common/types/Guild';
import { postDisplayName } from '@/constants/post';
import { post } from '@/utils/apiHelper';
import { Checkbox, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { mutate } from 'swr';

type Props = {
  post: GuildPostItem;
  member: GuildMemberItem;
  disabled?: boolean;
};
export const GuildMemberPostForm: React.FC<Props> = (props) => {
  const toast = useToast();
  const [hasPost, setHasPost] = useState(
    props.member.posts.some((memberPosts) => {
      return memberPosts.id === props.post.id;
    })
  );

  const toggleHasPost = async (postId: number, value: boolean) => {
    setHasPost(value);

    const postIds = props.member.posts.map((post) => post.id);
    if (value) {
      postIds.push(postId);
    } else {
      postIds.splice(postIds.indexOf(postId), 1);
    }

    try {
      await post(
        `/api/guild/${props.member.guildId}/member/${props.member.id}/posts`,
        {
          posts: postIds,
        }
      );
      await mutate('useGuild');
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
    <Checkbox
      isChecked={hasPost}
      onChange={(e) => {
        toggleHasPost(props.post.id, e.target.checked);
      }}
      disabled={props.disabled}
    >
      {postDisplayName[props.post.name]}
    </Checkbox>
  );
};
