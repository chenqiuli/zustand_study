import { Button, Space } from '@ifca/ui-components';
import { useCatStore2 } from '../store/CatStore2';

function CatsBox() {
  const bigCats = useCatStore2((state) => state.cats.bigCats);
  const smallCats = useCatStore2((state) => state.cats.smallCats);
  const increaseBigCat = useCatStore2((state) => state.increaseBigCat);
  const increaseSmallCat = useCatStore2((state) => state.increaseSmallCat);
  const summary = useCatStore2((state) => state.summary);

  return (
    <div>
      <h2>Zustand-2：取reactive的状态</h2>
      <div>
        <div>Big Cats: {bigCats}</div>
        <div>Small Cats: {smallCats}</div>
        <div>All Cats: {summary()}</div>
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

export { CatsBox };
