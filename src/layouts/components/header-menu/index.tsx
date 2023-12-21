import { history } from '@umijs/max';
import styles from './index.less';
const HEADER_MENU = [
  {
    key: '/home',
    label: '首页',
  },
  {
    key: '/aside',
    label: '侧边栏页面',
  },
  {
    key: '/detail',
    label: '详情页',
  },
];

const HeaderMenu = () => {
  return (
    <>
      {HEADER_MENU.map((item) => {
        return (
          <div key={item.key} className={styles.item}>
            <div
              onClick={() => {
                history.push(item.key);
              }}
            >
              {item.label}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default HeaderMenu;
