import { matchHandicap } from 'esports-core/services/api';
import { normalizeData, newDataAccordingToID } from 'esports-core/utils/util';


export default {
  namespace: 'matchHandicap',

  state: {
    matchHandicap: {
      list: [],
      round: []
    }
  },

  effects: {
    *fetchMatchHandicap({ payload }, { call, put, select }) {
      let data = yield call(matchHandicap, payload);
      let data1 = normalizeData(data,'handicap_id');
      const matchHandicapDB = yield select( state => state.matchHandicapDB.matchHandicapDB);
      const newMatchHandicapDB = Object.assign({}, matchHandicapDB, data1.list);
      let data2 = newDataAccordingToID(data,'round');
      console.log(data2);
      yield put({
        type: 'matchHandicapDB/saveMatchHandicapData',
        payload: newMatchHandicapDB,
      });
      yield put({
        type: 'save',
        payload: data2,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        matchHandicap: payload,
      };
    },
  },
};
