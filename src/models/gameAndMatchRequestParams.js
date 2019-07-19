export default {
  namespace: 'gameAndMatchRequestParams',

  state: {
      game_id:'',
      matchType:1
  },

  effects: {
    *modifyGameType({payload}, { call, put, select }) {
      const { game_id } = payload;
      yield put({
        type: 'saveGameTypeParams',
        payload: game_id,
      });
    },
    *modifyMatchType({payload}, { call, put, select }) {
      const { matchType } = payload;
      yield put({
        type: 'saveMatchTypeParams',
        payload: matchType,
      });
    },
  },

  reducers: {
    saveGameTypeParams(state, { payload }) {
      return {
        ...state,
        game_id: payload,
      };
    },
    saveMatchTypeParams(state, { payload }) {
      return {
        ...state,
        matchType: payload,
      };
    },
  },
};
