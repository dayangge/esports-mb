import { matchResultInfo } from 'esports-core/services/api';
import { normalizeData, newDataAccordingToID } from 'esports-core/utils/util';


export default {
  namespace: 'matchResultDB',

  state: {
    matchResultDB: {
      list:{
        round:[],
        list:[]
      }
    },
  },

  effects: {
    *fetchMatchDetail({payload}, { call, put }) {
      let data = yield call(matchResultInfo, payload);
      data.list = newDataAccordingToID(data.list, 'round');
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
        matchResultDB: payload,
      };
    },
  },

};
