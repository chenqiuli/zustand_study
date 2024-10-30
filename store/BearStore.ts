import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type BearStoreType = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

const useBearStore = create<BearStoreType>()(
  devtools(
    (set) => ({
      bears: 0,
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    {
      enabled: true,
      name: 'bear store',
    },
  ),
);

export { useBearStore };

/**
 * useBearStore是个hook，存储状态，用来状态管理
 * create内的set是自带的api，用于设置本身状态内的变量的值方法，set内的state是指整个状态
 * set里面的state是immutable不可变对象，只能默认解构第一层，如果有多级，需要...解构出来再去赋值
 */
