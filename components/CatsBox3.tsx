import { Button, Space } from '@ifca/ui-components';
import { useShallow } from 'zustand/react/shallow';
import { useCatStore2 } from '../store/CatStore2';

function CatsBox3() {
  /** 第三种写法：selector一次选择一个状态  */
  // const increaseBigCat = useCatStore2.use.increaseBigCat();
  // const increaseSmallCat = useCatStore2.use.increaseSmallCat();

  /** 第四种写法：selector一次选择多个状态  */
  const { increaseBigCat, increaseSmallCat } = useCatStore2(
    useShallow((state) => ({
      increaseBigCat: state.increaseBigCat,
      increaseSmallCat: state.increaseSmallCat,
    })),
  );

  return (
    <div>
      <h2>Zustand-2：selector取状态，createSelectors一个store，immer中间件，devtools中间件</h2>
      <div>
        <div>{Math.random()}</div>
        <Space>
          <Button type="primary" onClick={increaseBigCat}>
            add Big Cats
          </Button>
          <Button onClick={increaseSmallCat}>add Small Cats</Button>
        </Space>
      </div>
    </div>
  );
}

export { CatsBox3 };
