import { Button, Space } from '@ifca/ui-components';
import { useBearStore } from '../store/BearStore';

function BearsBox() {
  /** 第一种写法：一个个解构，坏处：状态多的时候要一个个解构。state是整个store的所有状态  */
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  const removeAllBears = useBearStore((state) => state.removeAllBears);

  /** 第二种写法：整个状态引入，需要的解构， 坏处：不需要的状态也引入进来了,会导致不必要的重渲染。state是整个store的所有状态  */
  //   const { bears, increasePopulation, removeAllBears } = useBearStore();

  return (
    <div>
      <h2>Zustand-1：create一个store</h2>
      <div>
        <div>bears: {bears}</div>
        <Space>
          <Button type="primary" onClick={increasePopulation}>
            add bears
          </Button>
          <Button onClick={removeAllBears}>remove all bears</Button>
        </Space>
      </div>
    </div>
  );
}

export { BearsBox };
