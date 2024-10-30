import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const initialTestValue = {
  count: 10,
};

const useTestStore = create<typeof initialTestValue>()(
  devtools(
    persist(() => initialTestValue, {
      name: 'test store',
    }),
    {
      name: 'test store',
    },
  ),
);

const testStoreReducer = {
  settingCount: (count: number) => useTestStore.setState({ count }),
  addCount: () => testStoreReducer.settingCount(useTestStore.getState().count + 1),
  substractCount: () => testStoreReducer.settingCount(useTestStore.getState().count - 1),
  clearCount: () => testStoreReducer.settingCount(0),
};

export { testStoreReducer, useTestStore };

/**
 * 既能用在compoennt内，也能用在纯JS中
 * useFoodStore.getState().fish：在state外面获取state的状态，non-reactive（任何状态的改变不会导致component重渲染），一般用来初始化，想要让视图层同时变化需要使用reactive的写法
 * useFoodStore.setState(state => ({
 *    fish: state.fish + 5
 * }))：在state外面设置state的状态
 *
 *
 * 把actions从store里分离出来：
 * 一般写在Reducer内，Reducer内的函数可以调用函数，
 *
 *
 */
