export default {
  namespace: 'gameAndMatchRequestParams',

  state: {
      gameID:1,
      matchType:1
  },

  effects: {
    *modifyGameType({payload}, { call, put, select }) {
      const { gameID } = payload;
      yield put({
        type: 'saveGameTypeParams',
        payload: gameID,
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
        gameID: payload,
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
