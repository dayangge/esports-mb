
export default {
  namespace: 'matchHandicapDB',

  state: {
    matchHandicapDB: {
    },
  },

  effects: {
    *saveMatchHandicapData({payload}, { call, put }) {
      yield put({
        type: 'save',
        payload: payload,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        matchHandicapDB: payload,
      };
    },
  },

};
