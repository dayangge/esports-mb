import { matchInfo } from 'esports-core/services/api';

export default {
  namespace: 'matchInfo',

  state: {
    matchInfo: {
      host_player:{},
      guest_player:{}
    },
  },

  effects: {
    *fetchMatchInfo({ payload }, { call, put }) {
      const data = yield call( matchInfo, payload );
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
        matchInfo: payload,
      };
    },
  },
};
