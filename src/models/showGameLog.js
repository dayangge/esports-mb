export default {
  namespace: 'showGameLog',

  state: {
    isShowGameLog : false
  },

  effects: {
    *toggleGameLog({payload}, { call, put }) {
      yield put({
        type: 'save',
        payload,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        isShowGameLog: payload,
      };
    },
  },
};
