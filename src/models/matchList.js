import  {matchList}  from 'esports-core/services/api';
import  {normalizeData}  from 'esports-core/utils/util';


export default {
  namespace: 'matchList',

  state: {
    matchList: [],
  },

  effects: {
    *fetchMatchList({ payload }, { call, put, select }) {
      let data = yield call(matchList, payload);
      data.map((v) => {
        v.Bet.map((val) => {
          val.Items = normalizeData(val.Items,'ItemID');
        });
      });
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
        matchList: payload,
      };
    },
  },
};
