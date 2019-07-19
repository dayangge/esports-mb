import { postBetOrder } from 'esports-core/services/api';

export default {
  namespace: 'betOrders',

  state: {
    betOrders: [],
  },

  effects: {
    *postBetOrder({ payload, callback }, { call, put, select }) {
      const orders = payload;
      yield put({
        type: 'save',
        payload: orders,
      });
      let data = yield call(postBetOrder, orders);
      if (callback) callback(data);
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        betOrders: payload,
      };
    },
  },
};
