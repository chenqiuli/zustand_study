import { Space } from '@ifca/ui-components';
import { TestPage } from './Pages/TestPage';

export default function Page() {
  return (
    <div>
      <Space direction="vertical" size={[0, 30]}>
        {/* <BearPage /> */}
        {/* <CatPage /> */}
        {/* <DogPage /> */}
        {/* <FoodPage /> */}
        <TestPage />
      </Space>
    </div>
  );
}
