const routes = [
  {
    title: '登录',
    path: '/login',
    component: './login',
    layout: false,
  },
  {
    path: '/',
    component: '@/layouts/index',
    layout: false,
    routes: [
      {
        title: '首页',
        path: '/',
        redirect: '/home',
        meta: {
          layout: 'headFooterLayout',
        },
      },
      {
        title: '首页',
        path: '/home',
        component: './home',
        meta: {
          layout: 'headFooterLayout',
        },
      },
    ],
  },
];

export default routes;
