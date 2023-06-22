import { Tag } from '@chakra-ui/react';

type Props = {
  tagNames: string[];
};
export const TagCards: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-wrap">
      {props.tagNames.map((tagName, index) => (
        <div key={index} className="m-1">
          <Tag colorScheme="gray">{tagName}</Tag>
        </div>
      ))}
    </div>
  );
};
