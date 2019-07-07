import { runningAccount } from 'esports-core/services/api';

export default {
  namespace: 'runningAccountLog',

  state: {
    runningAccountLog: {
      RecordCount: 0,
      PageIndex: 1,
      PageSize: 10,
      list:[]
    },
  },

  effects: {
    *fetchRunningAccountLog({payload, callback}, { call, put, select }) {
      let data = yield call(runningAccount, payload);
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
        runningAccountLog: payload,
      };
    },
  },
};
