import { FC, ReactNode } from 'react';

import styles from './index.less';
import LayoutHeader from '@/layouts/components/layout-head';

interface HeadFooterLayoutProps {
  children: ReactNode;
}

const HeadFooterLayout: FC<HeadFooterLayoutProps> = ({ children }) => {
  return (
    <div className={styles['page']}>
      <div className={styles['page-head']}>
        <LayoutHeader />
      </div>
      <div className={styles['page-content']}>{children}</div>
    </div>
  );
};

export default HeadFooterLayout;
