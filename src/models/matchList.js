import { matchList } from 'esports-core/services/api';
import { normalizeData } from 'esports-core/utils/util';


export default {
  namespace: 'matchList',

  state: {
    matchList: {
      list:{
        main_handicap:[{
          handicap_items:[]
        }]
      },
      ids:[]
    },
  },

  effects: {
    *fetchMatchList({ payload }, { call, put, select }) {
      let data = yield call( matchList, payload );
      data = normalizeData(data, 'match_id');
      const matchDB = yield select( state => state.matchDB.matchDB);
      const newMatchDB = Object.assign({},matchDB,data.list);
      const { game_id } = payload;
      yield put({
        type: 'matchDB/saveMatchData',
        payload: newMatchDB,
      });
      yield put({
        type: 'gameDB/saveGameMatchListData',
        payload: {newMatchDB, game_id},
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
