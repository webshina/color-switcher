import { Tag } from '@chakra-ui/react';

type Props = {
  categories: any[];
};
export const CategoryCards: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-wrap">
      {props.categories.map((category) => (
        <div key={category.id} className="m-1">
          <Tag colorScheme="gray">{category.name}</Tag>
        </div>
      ))}
    </div>
  );
};
