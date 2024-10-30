import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createSelectors } from '../utils/createSelectors';

type DogStoreType = {
  dogs: number;
  color: string;
  size: string;
  addDogs: () => void;
  substractDogs: () => void;
  clear: () => void;
};

const useDogStoreBase = create<DogStoreType>()(
  immer(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          dogs: 0,
          color: 'yellow',
          size: 'middle',
          addDogs: () =>
            set((state) => {
              state.dogs++;
            }),
          substractDogs: () =>
            set((state) => {
              state.dogs--;
            }),
          clear: () =>
            set((state) => {
              state.dogs = 0;
            }),
        }),
        {
          name: 'dog store',
          partialize: (state) => ({ dogs: state.dogs }),
        },
      ),
    ),
  ),
);

const useDogStore = createSelectors(useDogStoreBase);

export { useDogStore };

/**
 * persist中间件：
 * 保存状态，刷新页面状态不会恢复成原始值
 * 第二个options参数内的name是必传属性，默认存储在localStorage，name是存储在localStorage的key名
 */
