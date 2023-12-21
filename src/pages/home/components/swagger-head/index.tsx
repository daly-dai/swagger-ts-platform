import appStore from '@/store/app';
import { Card } from 'antd';
import { useSnapshot } from 'valtio';

export default function SwaggerHead() {
  const { swaggerData } = useSnapshot(appStore.state);
  const { info, swagger } = swaggerData;
  return (
    <Card style={{ marginBottom: 20 }}>
      <h1>{info?.description}</h1>
      <h4>swagger{swagger}</h4>
    </Card>
  );
}
