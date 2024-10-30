import { Button, Space } from '@ifca/ui-components';
import { useShallow } from 'zustand/react/shallow';
import { useFoodStore } from '../store/FoodStore';

function FoodBox2() {
  const { fish, addFood } = useFoodStore(
    useShallow((state) => ({
      fish: state.fish,
      addFood: state.addFood,
    })),
  );

  return (
    <div>
      <div>
        <div>fish: {fish}</div>
        <div>{Math.random()}</div>
        <Space>
          <Button type="primary" onClick={addFood}>
            add fish
          </Button>
          <Button>substract fish</Button>
          <Button>remove all fish</Button>
        </Space>
      </div>
    </div>
  );
}

export { FoodBox2 };
