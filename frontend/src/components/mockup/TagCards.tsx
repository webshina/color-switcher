import { Tag } from '@chakra-ui/react';

type Props = {
  tags: any[];
};
export const TagCards: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-wrap">
      {props.tags.map((category) => (
        <div key={category.id} className="m-1">
          <Tag colorScheme="gray">{category.name}</Tag>
        </div>
      ))}
    </div>
  );
};
