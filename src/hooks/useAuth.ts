import appStore from '@/store/app';
import { useLocation } from '@umijs/max';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

// 用户权限中心接入后再写业务逻辑
const useAuth = () => {
  const [auth, setAuth] = useState(true);

  const location = useLocation();

  const appState = useSnapshot(appStore.state);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const initAuth = () => {
  //   const token = localStorage.getItem('token');
  //   // 用户权限中心未登录
  //   if (!token) {
  //     setAuth(false);
  //     history.push('/login');
  //     return;
  //   }

  //   // 登录但未初始化
  //   if (!appState.token && token) {
  //     appStore.setToken(token);
  //     setAuth(true);
  //     return;
  //   }

  //   setAuth(true);
  // };

  useEffect(() => {
    setAuth(true);
  }, [appState.token, location.pathname]);

  return { auth };
};

export default useAuth;
