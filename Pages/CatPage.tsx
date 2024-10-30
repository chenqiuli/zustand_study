import { Space } from '@ifca/ui-components';
import { CatsBox } from '../components/CatsBox';
import { CatsBox2 } from '../components/CatsBox2';
import { CatsBox3 } from '../components/CatsBox3';
function CatPage() {
  return (
    <>
      <Space size={[100, 0]}>
        <CatsBox />
        <CatsBox2 />
        <CatsBox3 />
      </Space>
      <div>
        PS：CatsBox内的状态是单独取的，CatsBox2内的状态是全部引入的，CatsBox2内只使用一个bigCats状态，但是在CatsBox内increaseSmallCat方法也会触发CatsBox2的Math.random()，CatsBox2内并没有使用smallCats，这就是导致不必要的渲染。
        但是可以使用selector的方法去取状态和action，就不会导致不必要的渲染。
        <br />
        点击CatsBox3的add方法，随机数不会触发，没有导致渲染。
      </div>
    </>
  );
}

export { CatPage };
