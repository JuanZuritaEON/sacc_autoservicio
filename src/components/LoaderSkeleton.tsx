import { Skeleton, Space } from 'antd';

const LoaderSkeleton = () => {
  return (
    <Space vertical style={{ width: '100%' }} size="large">
      <Skeleton.Input active block size="large" />
      <Space wrap>
        <Skeleton.Button active size="large" shape="default" />
        <Skeleton.Button active size="large" shape="default" />
        <Skeleton.Button active size="large" shape="default" />
      </Space>
      <Skeleton.Input active block size="large" />
      <Skeleton.Button active size="large" block />
    </Space>
  );
}

export default LoaderSkeleton;
