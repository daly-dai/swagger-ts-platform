import { FC, ReactNode } from 'react';
import styles from './index.less';
import AsideMenu from '@/layouts/components/aside-menu';
interface AsideLayoutProps {
  children: ReactNode;
}

const AsideLayout: FC<AsideLayoutProps> = ({ children }) => {
  return (
    <div className={styles['page']}>
      <div className={styles['page-left']}>
        <AsideMenu></AsideMenu>
      </div>
      <div className={styles['page-right']}>{children}</div>
    </div>
  );
};

export default AsideLayout;
