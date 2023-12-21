import React, { useEffect, useState } from 'react';
import { history, useLocation } from '@umijs/max';
import { Button, Layout, Menu } from 'antd';
import { cloneDeep } from 'lodash-es';
import {
  HomeOutlined,
  MacCommandOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MergeCellsOutlined,
} from '@ant-design/icons';

import styles from './index.less';

import { getNodePath } from '@/utils/tree';

const { Sider } = Layout;
// 等用户权限中心完善之后，将提供完整的讨论过之后的技术方案
const menuListData = [
  {
    label: '首页',
    key: '/home',
    icon: <HomeOutlined />,
  },
  {
    label: '侧边栏',
    key: '/aside',
    icon: <MergeCellsOutlined />,
  },
  {
    label: '详情',
    key: '/detail',
    icon: <MacCommandOutlined />,
  },
];

interface SideMenuProps {
  style?: Record<string, string | number>;
}

const AsideMenu: React.FC<SideMenuProps> = ({ style }) => {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const [menuList] = useState(menuListData);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const getOpenKeys = (routerKey?: string | undefined) => {
    const { pathname } = location;

    const routerPath = routerKey || pathname;
    const stashList = cloneDeep(menuList);

    const pathList = getNodePath(
      stashList,
      routerPath,
      'key',
      'children',
    ) as string[];

    if (!pathList?.length) {
      setOpenKeys([]);
      return;
    }

    setOpenKeys(pathList);
  };

  useEffect(() => {
    if (!menuList?.length) return;

    getOpenKeys();
  }, [menuList, collapsed]);

  const renderMenuList = () => {
    return menuList.map((item: any) => {
      const result = { ...item };

      return result;
    });
  };

  if (!menuList?.length) {
    return <></>;
  }

  return (
    <Sider
      style={{ ...style }}
      collapsed={collapsed}
      className={styles['sider']}
    >
      <Menu
        mode="inline"
        selectedKeys={openKeys}
        openKeys={openKeys}
        defaultOpenKeys={openKeys}
        onOpenChange={(openKeys: string | any[]) => {
          setOpenKeys(openKeys as any);
        }}
        items={renderMenuList()}
        onClick={(e: any) => {
          setOpenKeys(e.keyPath);
          history.push(e.key);
        }}
      />

      <Button className={styles['sider-button']} onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </Sider>
  );
};

export default AsideMenu;
