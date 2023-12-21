import { FC, ReactNode } from 'react';

import styles from './index.less';
import LayoutHeader from '@/layouts/components/layout-head';
import AsideMenu from '@/layouts/components/aside-menu';

interface HeadAsideLayoutProps {
  children: ReactNode;
}
const HeadAsideLayout: FC<HeadAsideLayoutProps> = ({ children }) => {
  return (
    <div className={styles['page']}>
      <div className={styles['page-head']}>
        <LayoutHeader></LayoutHeader>
      </div>
      <div className={styles['page-content']}>
        <div className={styles['page-content-left']}>
          <AsideMenu></AsideMenu>
        </div>
        <div className={styles['page-content-right']}>{children}</div>
      </div>
    </div>
  );
};

export default HeadAsideLayout;
