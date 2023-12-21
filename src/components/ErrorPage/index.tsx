import styles from './index.less';
import errorPage from './error-page.png';

const ErrorPage = ({ text }: { text?: any }) => {
  return (
    <div className={styles['not-data']}>
      <img src={errorPage} />
      <p>{text || '页面失效或不存在'}</p>
    </div>
  );
};

export default ErrorPage;
