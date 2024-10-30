import { Space } from '@ifca/ui-components';
import { FoodBox } from '../components/FoodBox';
import { FoodBox2 } from '../components/FoodBox2';

function FoodPage() {
  return (
    <Space>
      <FoodBox />
      <FoodBox2 />
    </Space>
  );
}

export { FoodPage };
