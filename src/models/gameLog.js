import { gameLog } from 'esports-core/services/api';

export default {
  namespace: 'gameLog',

  state: {
    gameLog: {
      RecordCount: 0,
      PageIndex: 1,
      PageSize: 10,
      list:[]
    },
  },

  effects: {
    *fetchGameLog({payload, callback}, { call, put }) {
      let data = yield call(gameLog, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if(callback) callback(data)
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        gameLog: payload,
      };
    },
  },
};
