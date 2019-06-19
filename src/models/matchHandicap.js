import  { matchHandicap }  from 'esports-core/services/api';
import  { normalizeData }  from 'esports-core/utils/util';

export default {
  namespace: 'matchHandicap',

  state: {
    matchHandicap: {
      data:{
        Round:[]
      },
      list: []
    },
  },

  effects: {
    *fetchMatchHandicap({ payload }, { call, put, select }) {
      let data = yield call(matchHandicap, payload);
      data.list= normalizeData(data.list,'BetID');
      data.list.ids.map((val) => {
        data.list.list[val].Items = normalizeData(data.list.list[val].Items ,'ItemID');
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
        matchHandicap: payload,
      };
    },
  },
};
