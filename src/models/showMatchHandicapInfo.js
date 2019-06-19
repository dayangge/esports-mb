export default {
  namespace: 'showMatchHandicapInfo',

  state: {
    isShowNum : -1
  },

  effects: {
    *changeMatchHandicapIndex({payload}, { call, put }) {
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
        isShowNum: payload,
      };
    },
  },
};
