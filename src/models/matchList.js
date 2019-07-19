import { matchList } from 'esports-core/services/api';
import { normalizeData } from 'esports-core/utils/util';


export default {
  namespace: 'matchList',

  state: {
    matchList: {
      list:{
        main_handicap:{
          handicap_items:[]
        }
      },
      ids:[]
    },
    pagination:{
      page_index:0,
      page_size: 20
    }
  },

  effects: {
    *fetchMatchList({ payload }, { call, put, select }) {
      let data = yield call( matchList, payload );
      if(data === undefined){return}
      data = normalizeData(data, 'match_id');
      const matchDB = yield select( state => state.matchDB.matchDB);
      const newMatchDB = Object.assign({},matchDB,data.list);
      yield put({
        type: 'matchDB/saveMatchData',
        payload: newMatchDB,
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
