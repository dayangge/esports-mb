import  { matchResult }  from 'esports-core/services/api';
import  { normalizeData }  from 'esports-core/utils/util';
export default {
  namespace: 'matchResult',

  state: {
    matchResult: {
      RecordCount: 0,
      PageIndex: 1,
      PageSize: 20,
      list:{
        ids: [],
        list: {}
      }
    },
  },

  effects: {
    *fetchMatchResult({payload}, { call, put, select }) {
      let data = yield call(matchResult, payload);
      data.list = normalizeData(data.list, 'ID');
      yield put({
        type: 'save',
        payload: data,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        matchResult: payload,
      };
    },
  },
};
