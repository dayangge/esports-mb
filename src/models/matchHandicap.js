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
      if(data === undefined){return}
      let handicapData = normalizeData(data,'handicap_id');
      const matchHandicapDB = yield select( state => state.matchHandicapDB.matchHandicapDB);
      const newMatchHandicapDB = Object.assign({}, matchHandicapDB, handicapData.list);
      let data2 = newDataAccordingToID(data,'round');
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
