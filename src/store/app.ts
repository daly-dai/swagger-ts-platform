import generateStore from '@/plugins/valtio-persister';
interface appStoreType {
  token: string;
  swaggerData: any;
}

const appStore = generateStore<appStoreType>({
  key: 'appStore',
  state: {
    token: '',
    swaggerData: {},
  },
  actions: {
    setToken: (token: string) => {
      appStore.state['token'] = token;
    },
    setSwaggerData: (data: any) => {
      appStore.state['swaggerData'] = data;
    },
    clearStore: () => {
      appStore.state['token'] = '';
    },
  },
  persist: [
    {
      storage: localStorage,
      paths: ['token', 'swaggerData'],
    },
  ],
});

export default appStore;
