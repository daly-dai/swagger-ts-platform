import React, { useEffect } from 'react';
import { MicroAppWithMemoHistory } from '@umijs/max';
import appStore from '@/store/app';

const PAGE_TITLE = '管理端脚手架';

const Login: React.FC = () => {
  // 清除登录相关状态
  appStore.clearStore();

  // 进入登录页面时，设置页面标题
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.title !== PAGE_TITLE) {
        document.title = PAGE_TITLE;
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <MicroAppWithMemoHistory name="userCenter" url={'/login'} />;
};

export default Login;
