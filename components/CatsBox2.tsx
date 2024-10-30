import { Button, Space } from '@ifca/ui-components';
import { useCatStore2 } from '../store/CatStore2';

function CatsBox2() {
  /** 第二种写法：整个状态引入，需要的解构， 坏处：不需要的状态也引入进来了,会导致不必要的重渲染。state是整个store的所有状态  */
  const {
    cats: { bigCats },
    summary,
    increaseBigCat,
  } = useCatStore2();

  return (
    <div>
      <h2>Zustand-2：取全部状态但使用部分，会有不必要的重渲染</h2>
      <div>
        <div>Big Cats: {bigCats}</div>
        <div>All Cats: {summary()}</div>
        <div>{Math.random()}</div>
        <Space>
          <Button type="primary" onClick={increaseBigCat}>
            add Big Cats
          </Button>
        </Space>
      </div>
    </div>
  );
}

export { CatsBox2 };
