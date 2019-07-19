import { loginApp,loginToRefreshToken } from 'esports-core/services/api';

export default {
  namespace: 'login',

  state: {
    isLogin:false,
    token: {

    },
  },

  effects: {
    *login({ payload, callback }, { call, put }) {
      let data = yield call(loginApp, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if (callback) callback(data);
    },
    *refreshToken({ payload, callback }, { call, put }) {
      let data = yield call(loginToRefreshToken, payload);
      if (callback) callback(data);
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        token: payload,
      };
    },
    change(state, { payload }) {
      return {
        ...state,
        isLogin: payload,
      };
    },
  },
};
