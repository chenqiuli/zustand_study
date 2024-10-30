import { Button, Space } from '@ifca/ui-components';
import { testStoreReducer, useTestStore } from '../store/TestStore';

function TestBox() {
  /** reactive的状态，改变state页面会立即渲染 */
  const count = useTestStore((state) => state.count);
  /** non-reactive，改变state页面不会立即渲染，但是devtools内会，证明不会重渲染，用来做初始化判断很有效 */
  const defaultCount = useTestStore.getState().count;
  
  const { addCount, substractCount, clearCount } = testStoreReducer;

  const addFiveCounts = () => {
    useTestStore.setState({
      count: useTestStore.getState().count + 5,
    });
  };

  return (
    <div>
      <div>{count}</div>
      {/* <div>{defaultCount}</div> */}
      <div>
        <Space>
          <Button type="primary" onClick={addCount}>
            add count
          </Button>
          <Button onClick={substractCount}>sbstract count</Button>
          <Button onClick={clearCount}>clear count</Button>
          <Button type="primary" onClick={addFiveCounts}>
            add five count
          </Button>
        </Space>
      </div>
    </div>
  );
}

export { TestBox };
