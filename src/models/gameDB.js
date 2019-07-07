
export default {
  namespace: 'gameDB',

  state: {
    gameDB: {
    },
  },

  effects: {
    *saveGameData({payload}, { call, put, select }) {
      yield put({
        type: 'save',
        payload: payload,
      });
    },
    *saveGameMatchListData({payload}, { call, put, select }) {
      yield put({
        type: 'saveMatchList',
        payload: payload,
      });
    },

  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        gameDB: payload,
      };
    },
  },

};
