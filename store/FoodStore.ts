import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

type FoodStoreType = {
  fish: number;
  addFood: () => void;
  substractFood: () => void;
};

const useFoodStore = create<FoodStoreType>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set) => ({
          fish: 0,
          addFood: () =>
            set((state) => ({
              fish: state.fish + 1,
            })),
          substractFood: () =>
            set((state) => ({
              fish: state.fish - 1,
            })),
        }),
        {
          name: 'food store',
        },
      ),
    ),
    {
      name: 'food store',
    },
  ),
);

export { useFoodStore };

/**
 * subscribeWithSelector中间件：允许组件订阅state的一部分，而不是整个state，每次状态更新时，选择器函数会被重新执行，只有当返回值与上一次执行的结果不同时，组件才会重新渲染。
 * useEffect(() => {
    const unsub = useFoodStore.subscribe(
      (state) => state.fish,
      (fish, prevFish) => {
        console.log(fish, prevFish);

        if (fish >= 5 && prevFish < 5) {
          setBgColor('lightgreen');
        } else if (fish < 5 && prevFish >= 5) {
          setBgColor('lightpink');
        }
      },
      {
        fireImmediately: true, // 是否在第一次运行的时候执行
      },
    );

    return unsub;
  }, []);
 */
