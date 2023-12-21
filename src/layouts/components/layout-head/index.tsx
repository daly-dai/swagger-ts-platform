import { logo } from '@/assets/images';
import styles from './index.less';

const LayoutHeader = () => {
  return (
    <div className={styles['header']}>
      <div className={styles['header-left']}>
        <div className={styles['header-left-logo']}>
          <img src={logo}></img>
          swagger-platform
        </div>
        <div className={styles['header-split']}></div>
      </div>
    </div>
  );
};

export default LayoutHeader;
