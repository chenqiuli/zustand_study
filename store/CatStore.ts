import { create } from 'zustand';

type CatStoreType = {
  cats: {
    bigCats: number;
    smallCats: number;
  };
  increaseBigCat: () => void;
  increaseSmallCat: () => void;
};

const useCatStore = create<CatStoreType>()((set) => ({
  cats: {
    bigCats: 0,
    smallCats: 0,
  },
  increaseBigCat: () =>
    set((state) => ({
      cats: {
        ...state.cats,
        bigCats: state.cats.bigCats + 1,
      },
    })),
  increaseSmallCat: () =>
    set((state) => ({
      cats: {
        ...state.cats,
        smallCats: state.cats.smallCats + 1,
      },
    })),
}));

export { useCatStore };

/**
 * set内的state是immutable不可变对象，如果状态是引用类型，那么需要使用...state.xxx来更新
 * 但是可以使用middleware的immer来修改state
 * 
 * ES6简写：
 * increaseBigCat: () =>
    set((state) => ({
      cats: {
        ...state.cats,
        bigCats: state.cats.bigCats + 1,
      },
    }))
 * 
 * 原来的写法：   
 * increaseBigCat: () =>
    set((state) => {
      return {
        cats: {
          ...state.cats,
          bigCats: state.cats.bigCats + 1,
        },
      };
    }),
 */
