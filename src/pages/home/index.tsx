import SwaggerParse from '@/plugins/parsing-swagger';
import { Button, Input, Space } from 'antd';
import SwaggerTree from './components/swaggerTree';
import './index.less';

import appStore from '@/store/app';
import { useSnapshot } from 'valtio';
import SwaggerContent from './components/swagger-content';

const HomePage: React.FC = () => {
  const { swaggerData } = useSnapshot(appStore.state);

  const handleUpload = async () => {
    const result = await fetch(
      'http://localhost:8000/default_OpenAPI.json',
    ).then((response) => response.json());

    const data = await SwaggerParse(result);
    console.log(data, 'datadata');
    appStore.setSwaggerData(data);
  };
  return (
    <div className="home">
      <div className="home-head">
        <Space>
          <Button type="text" onClick={handleUpload}>
            上传文件
          </Button>
          <Button type="text">加载路由</Button>
        </Space>
      </div>
      <div className="home-content">
        <div className="home-content-left">
          <Input
            style={{ width: '90%', marginBottom: '20px' }}
            placeholder="请输入搜索内容"
          ></Input>
          <div className="home-content-left-content">
            <SwaggerTree dataSource={swaggerData?.tags ?? []} />
          </div>
        </div>
        <div className="home-content-right">
          <SwaggerContent></SwaggerContent>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
