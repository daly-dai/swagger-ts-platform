import MetaTypes from '@/types/metaTypes';
import { useRouteProps } from '@umijs/max';
import { useLocation } from '@umijs/max';
import { useEffect, useState } from 'react';

const useRouterMeta = () => {
  const location = useLocation();

  const routeProps = useRouteProps();

  const meta = (routeProps?.meta || {}) as MetaTypes;

  // 可作为依赖的状态值
  const [metaState, setMetaState] = useState<MetaTypes>({});

  useEffect(() => {
    setMetaState(meta || {});
  }, [location.pathname]);

  return { meta, metaState };
};

export default useRouterMeta;
