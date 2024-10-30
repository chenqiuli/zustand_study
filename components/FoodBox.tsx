import { useEffect, useState } from 'react';
import { useFoodStore } from '../store/FoodStore';

function FoodBox() {
  // 这种写法在别的component每次改变fish，随机数都会改变，证明会重渲染，因为这个fish是reactive的状态
  // const fish = useFoodStore((state) => state.fish);

  // 第一种subscribe写法，把整个state都订阅到了
  /**
  const [bgColor, setBgColor] = useState<'lightpink' | 'lightgreen'>('lightpink');

  useEffect(() => {
    const unsub = useFoodStore.subscribe((state, prevState) => {
      console.log(state, prevState);
      if (state.fish >= 5 && prevState.fish < 5) {
        setBgColor('lightgreen');
      } else if (state.fish < 5 && prevState.fish >= 5) {
        setBgColor('lightpink');
      }
    });

    return unsub;
  }, []);
  */

  // 第二种subscribe写法，只订阅fish这个状态
  /**
  const [bgColor, setBgColor] = useState<'lightpink' | 'lightgreen' | undefined>(undefined);

  useEffect(() => {
    const unsub = useFoodStore.subscribe(
      (state) => state.fish,
      (fish, prevFish) => {
        console.log(fish, prevFish);
        // 如果第一次不执行这个订阅函数，那么prevFish是undefined，所以要先判断一下
        if (fish === prevFish) {
          if (fish <= 5) {
            setBgColor('lightpink');
          } else {
            setBgColor('lightgreen');
          }
        }
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

  // 第三种写法：使用getState()初始化状态
  const [bgColor, setBgColor] = useState<'lightpink' | 'lightgreen' | undefined>(
    useFoodStore.getState().fish <= 5 ? 'lightpink' : 'lightgreen',
  );

  useEffect(() => {
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

  return (
    <div
      style={{
        // backgroundColor: fish >= 5 ? 'lightgreen' : 'lightpink',
        backgroundColor: bgColor,
      }}
    >
      <h2>Zustand-4：subscribe订阅、subscribeWithSelector中间件</h2>
      <div>
        <div>{Math.random()}</div>
      </div>
      <div>
        有时候开发中会有一个需求：这个状态改变了，组件需要根据这个状态去做背景颜色的切换
        <br />
      </div>
    </div>
  );
}

export { FoodBox };
/**
 * useFoodStore.subscribe
 */
