import React, { FC, useMemo } from 'react';
import styles from './index.less';
import NotDataIcon from './not-data.png';

type sizeType = 'small' | 'default' | 'large';
interface NoDataProps {
  text?: string;
  className?: string;
  type?: sizeType;
}
const NoData: FC<NoDataProps> = ({ text, className, type = 'large' }) => {
  const size = useMemo(() => {
    const name = `not-data-${type}`;

    return styles[name];
  }, []);
  return (
    <div
      className={`${styles['not-data']} ${size} ${className ? className : ''}`}
    >
      <img src={NotDataIcon} />
      <p>{text || '暂无数据'}</p>
    </div>
  );
};

export default NoData;
