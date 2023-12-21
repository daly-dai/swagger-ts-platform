import generateStore from '@/plugins/valtio-persister';

interface PublicStoreState {
  isInit: boolean;
  dictionaryMap: any[];
}

const publicStore = generateStore<PublicStoreState>({
  key: 'publicStore',
  state: {
    isInit: false,
    dictionaryMap: [],
  },
  actions: {
    initPublic: (_, state) => {
      publicStore.setDictData([]);
      state.isInit = true;
    },
    setDictData: (data, state) => {
      state.dictionaryMap = data;
    },
  },
});

export default publicStore;
