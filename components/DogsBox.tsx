import { Button, Space } from '@ifca/ui-components';
import { useShallow } from 'zustand/react/shallow';
import { useDogStore } from '../store/DogStore';

function DogsBox() {
  const { dogs: dogs0 } = useDogStore();
  const dogs1 = useDogStore((state) => state.dogs);
  const dogs2 = useDogStore.use.dogs();

  const {
    dogs: dogs3,
    addDogs,
    substractDogs,
    clear,
  } = useDogStore(
    useShallow((state) => ({
      dogs: state.dogs,
      addDogs: state.addDogs,
      substractDogs: state.substractDogs,
      clear: state.clear,
    })),
  );

  return (
    <div>
      <h2>Zustand-3：persist中间件持久化管理状态</h2>
      <div>
        <div>dogs: {dogs0}</div>
        <div>dogs: {dogs1}</div>
        <div>dogs: {dogs2}</div>
        <div>dogs: {dogs3}</div>
        <Space>
          <Button type="primary" onClick={addDogs}>
            add dogs
          </Button>
          <Button type="primary" onClick={substractDogs}>
            subtract dogs
          </Button>
          <Button onClick={() => useDogStore.persist.clearStorage()}>reset store</Button>
          <Button onClick={clear}>clear store</Button>
        </Space>
        <div>
          PS：useDogStore.persist.clearStorage()只是清除localStorage内存储的key，但是缓存的状态还是没清除
          <br />
          清除状态，需要在store内定义一个函数去清空状态，但localStorage内存储的key不会消失
        </div>
      </div>
    </div>
  );
}

export { DogsBox };
