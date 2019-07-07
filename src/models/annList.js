import { annList } from 'esports-core/services/api';

export default {
  namespace: 'annList',

  state: {
    annList: {
      RecordCount: 0,
      PageIndex: 1,
      PageSize: 10,
      list: [],
    },
  },

  effects: {
    *fetchAnnList({ payload, callback }, { call, put }) {
      let data = yield call(annList, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if (callback) callback(data);
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        annList: payload,
      };
    },
  },
};
