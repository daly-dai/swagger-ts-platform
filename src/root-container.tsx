import { ConfigProvider } from 'antd';
import locale from 'antd/locale/zh_CN';

import { FC } from 'react';
import 'dayjs/locale/zh-cn';

import NoData from '@/components/NoData';
import React from 'react';

const Container: FC<any> = ({ children, routes }) => {
  return (
    <ConfigProvider
      locale={locale}
      renderEmpty={() => <NoData text={'暂无数据'} />}
    >
      {React.cloneElement(children!, {
        ...children.props,
        routes,
      })}
    </ConfigProvider>
  );
};

function rootContainer(container: any) {
  return React.createElement(Container, null, container);
}

export default rootContainer;
