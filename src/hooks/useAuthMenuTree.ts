import { useAppData, useLocation } from '@umijs/max';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { cloneDeep } from 'lodash-es';

import publicStore from '@/store/public';
import {
  exactMatchTree,
  filterTree,
  operationAttrToNodes,
  removeEmptyChildren,
} from '@/utils/tree';

import MetaTypes from '@/types/metaTypes';

interface MenuTypes {
  label: string;
  key: string;
  id: string;
  icon?: string;
  parentId: string | null;
  meta: MetaTypes;
  children: MenuTypes[];
}

const useAuthMenuTree = () => {
  const publicState = useSnapshot(publicStore.state);
  const { authTree: asideMenu } = publicState;

  const { clientRoutes } = useAppData();

  const stashClientRoutes = cloneDeep(clientRoutes);

  const location = useLocation();

  const { pathname } = location;

  const [menuList, setMenuList] = useState<MenuTypes[]>([]);
  const [microName, setMicroName] = useState('');

  // 处理本地路由
  const dispatchLocalRouter = () => {
    // 获取微应用路由
    const getCurrentRouterByPath = () => {
      const microName = `/${
        pathname?.split('/')?.[0] || pathname?.split('/')?.[1] || ''
      }`;

      return exactMatchTree<any>(
        stashClientRoutes,
        (node: any) => node.path === microName,
        'routes',
      );
    };

    const currentRouter = getCurrentRouterByPath();

    const routerMenuData = operationAttrToNodes(
      [currentRouter] as any,
      (node: any) => {
        const icon = node?.meta?.icon;

        node['label'] = node['name'];
        node['key'] = node['path'];
        node['children'] = cloneDeep(node['routes']);

        if (icon) node['icon'] = icon;

        delete node['element'];
        delete node['name'];
        delete node['path'];
        delete node['routes'];
        delete node['parentId'];
      },
      'children',
    );

    const filteredMenuData =
      filterTree<MenuTypes>(
        routerMenuData as any,
        (node) => {
          const meta = node?.meta || {};

          if (meta?.hideAside) return false;

          return true;
        },
        'children',
      ) || [];

    const result = removeEmptyChildren(filteredMenuData);

    const microName = result[0].label;

    const microMenu = result[0]?.children || [];

    return { localMenu: microMenu, microName };
  };

  // 处理远端路由
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatchAsideMenu = (localMenu: MenuTypes) => {
    if (!asideMenu?.length) return localMenu;

    // const asideMenuList = getTreeMap(asideMenu, 'childList');
  };

  useEffect(() => {
    const { localMenu, microName } = dispatchLocalRouter();

    setMicroName(microName);
    setMenuList(localMenu);
  }, [location.pathname]);

  return { menuList, microName };
};

export default useAuthMenuTree;
