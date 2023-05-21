import { useServerCategories } from '@/hooks/repository/useServerCategories';
import { Tag } from '@chakra-ui/react';

type Props = {};
export const CategoryCards: React.FC<Props> = () => {
  const categories = useServerCategories({ serverId: '1' });
  return (
    <div className="flex flex-wrap">
      {categories.map((category) => (
        <div key={category.id} className="m-1">
          <Tag colorScheme="gray">{category.name}</Tag>
        </div>
      ))}
    </div>
  );
};
