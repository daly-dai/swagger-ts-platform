import appStore from '@/store/app';
import { Card } from 'antd';
import { useSnapshot } from 'valtio';
import SwaggerHead from '../swagger-head';
import Interface from './components/interface';
import './index.less';

export default function SwaggerContent() {
  const prefixCls = 'swagger-content';
  const { swaggerData } = useSnapshot(appStore.state);
  const interfaceTree = swaggerData?.tags ?? [];

  return (
    <>
      <SwaggerHead></SwaggerHead>
      <div className={`${prefixCls}`}>
        {interfaceTree?.map((item: any) => {
          const operations = item?.operations || [];
          return (
            <Card style={{ marginBottom: 20 }} key={item.key}>
              <div className={`${prefixCls}-title`}>{item.name}</div>
              {operations.map((element: any) => (
                <Interface
                  key={element.key}
                  interfaceData={element}
                ></Interface>
              ))}
            </Card>
          );
        })}
      </div>
    </>
  );
}
