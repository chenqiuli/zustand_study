### [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)

1、创建一个简单的 store：state 与 actions 分离
setState：在 state 外修改 state，一般在 action 中使用。`useStore.setState`

```tsx
import { create } from "zustand";

const initialValue = {
  count: 0,
};

type ReducersType = {
  addCount: () => void;
  clearCount: () => void;
};

const useStore = create<typeof initialValue>()(() => initialValue);

const reducers: ReducersType = {
  addCount: () => useStore.setState({ count: useStore.getState().count + 1 }),
  clearCount: () => useStore.setState({ count: 10 }),
};

export { useStore, reducers };
```

2、组件中使用：
getState：state 外获取 state，一般在 action 中使用。`useStore.getState().count`

```tsx
const count = useStore((state) => state.count); // reactive的，改变状态页面会重渲染
const defaultCount = useStore.getState().count; // non-reactive的，改变状态页面不会重渲染，一般用于默认值
const { addCount, clearCount } = reducers;

const Test = () => {
  return (
    <div>
      <div>{count}</div>
      <div>{defaultCount}</div>
      <button onClick={addCount}></button>
      <button onClick={clearCount}></button>
    </div>
  );
};
```

3、immer 中间件：允许在 reducer 中直接修改类型为引用类型的 state，不需要先`...`解构

```tsx
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type StateType = {
  dogs: {
    bigDogs: number;
    smallDogs: number;
  };
};

type ReducersType = {
  addBigDogs: () => void;
  addSmallDogs: () => void;
};

const initialValue = {
  dogs: {
    bigDogs: 0,
    smallDogs: 0,
  },
};

const useStore = create<StateType>()(immer(() => initialValue));

const reducers: ReducersType = {
  addBigDogs: () =>
    useStore.setState((state) => {
      state.dogs.bigDogs++;
    }),
  addSmallDogs: () =>
    useStore.setState((state) => {
      state.dogs.smallDogs++;
    }),
};
```

4、persist 中间件：允许 state 持久化存储，默认存储在 localStorage，下次打开页面时自动读取
必须给 persist 中间件起一个 name，是 localStorage 的 key 名
partialize：回调函数，选择要持久化的数据，其它不持久化

```tsx
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialValue = {
  count: 0,
  name: "zustand",
};

const useStore = create<typeof initialValue>()(
  persist(() => initialValue, {
    name: "store",
    partialize: (state) => ({ count: state.count }),
  })
);

export { useStore };
```

5、devtools 中间件：在浏览器使用 Redux 调试器

```tsx
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialValue = {
  count: 0,
  name: "zustand",
};

const useStore = create<typeof initialValue>()(
  devtools(() => initialValue, {
    name: "store",
  })
);

export { useStore };
```

6、subscribeWithSelector 中间件：被包裹的 store 会有订阅的功能，允许组件订阅 state 的一部分，而不是整个 state，每次状态更新时，选择器函数会被重新执行，只有当返回值与上一次执行的结果不同时，组件才会重新渲染

```tsx
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const initialValue = {
  count: 0,
  addCount: () => void;
};

type StateType = {
  count: number;
  addCount: () => void;
}

const useStore = create<StateType>()(
  subscribeWithSelector(() => ({
    count: 0,
    addCount: () => useStore.setState({ count: useStore.getState().count + 1 })
  }))
);

export { useStore };
```

例子：一个组件更新了 count，另一个组件想要根据 count 的数量去做不同的样式渲染，这个时候就需要用到订阅 state 的功能，只有当 count 更新，该组件才重渲染。
`useShallow`，来防止不必要的重新渲染

```tsx
import { useShallow } from "zustand/react/shallow";

const { count, addCount } = useStore(
  useShallow((state) => ({
    count: state.count,
    addCount: state.addCount,
  }))
);

const Test1 = () => {
  return (
    <div>
      <div>{count}</div>
      <button onClick={addCount}></button>
    </div>
  );
};
```

```tsx
const [bgColor, setBgColor] = useState<"lightpink" | "lightgreen" | undefined>(
  useStore.getState().count <= 5 ? "lightpink" : "lightgreen"
);

useEffect(() => {
  const unsub = useStore.subscribe(
    (state) => state.count,
    (count, prevCount) => {
      if (count >= 5 && prevCount < 5) {
        setBgColor("lightgreen");
      } else if (count < 5 && prevCount >= 5) {
        setBgColor("lightpink");
      }
    },
    {
      fireImmediately: true, // 是否在第一次运行的时候执行
    }
  );

  return unsub;
}, []);

const Test2 = () => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
    >
      Test2
    </div>
  );
};
```

7、多个中间件一起使用书写顺序：

```tsx
import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { devtools, subscribeWithSelector, persist } from "zustand/middleware";

const initialValue = {
  count: 0,
  name: "zustand",
  dogs: {
    bigDogs: 0,
    smallDogs: 0,
  },
};

type StateType = {
  count: number;
  name: string;
  dogs: {
    bigDogs: number;
    smallDogs: number;
  };
};

const useStore = create()(
  devtools(
    immer(
      subscribeWithSelector(
        persist(
          () => ({
            count: 0,
          }),
          {
            name: "store",
            partialize: (state) => ({ count: state.count }),
          }
        )
      )
    ),
    {
      name: "store",
    }
  )
);

export { useStore };
```
