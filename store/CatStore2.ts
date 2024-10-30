import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createSelectors } from '../utils/createSelectors';

type CatStoreType = {
  cats: {
    bigCats: number;
    smallCats: number;
  };
  increaseBigCat: () => void;
  increaseSmallCat: () => void;
  summary: () => number;
};

const useCatStore2Base = create<CatStoreType>()(
  immer(
    devtools(
      (set, get) => ({
        cats: {
          bigCats: 0,
          smallCats: 0,
        },
        increaseBigCat: () =>
          set((state) => {
            state.cats.bigCats++;
          }),
        increaseSmallCat: () =>
          set((state) => {
            state.cats.smallCats++;
          }),
        summary: () => {
          return get().cats.bigCats + get().cats.smallCats;
        },
      }),
      {
        enabled: true,
        name: 'cat store'
      },
    ),
  ),
);

const useCatStore2 = createSelectors(useCatStore2Base);

export { useCatStore2 };

/**
 * immer中间件：直接来修改state，set内连return也不需要了
 *
 */

/**
 * 使用createSelectors包裹后，组件内取状态和action：
 * 取状态：useCatStore3.use.bears() 一次只能返回一个第一层的state，所以要用useShallow
 * 取action：useCatStore2.use.increaseBigCat()
 */
