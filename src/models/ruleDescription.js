import {  ruleDesc } from 'esports-core/services/api';

export default {
  namespace: 'ruleDescription',

  state: {
    content:{
      Content:''
    }
  },

  effects: {
    *fetchRuleDescription({payload}, { call, put }) {
      let data = yield call(ruleDesc, payload);
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
        content: payload,
      };
    },
  },
};
