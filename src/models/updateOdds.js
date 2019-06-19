import  { getOddsList }  from 'esports-core/services/api';

export default {
  namespace: 'oddsList',

  state: {
    oddsList: {}
  },

  effects: {
    *fetchOddsList({payload}, { call, put, select }) {
      const data = yield call(getOddsList, payload);
      const oldData = yield select(
        state => state.oddsList.oddsList
      );
      for(let key in oldData){
        if(oldData.hasOwnProperty(key)){
          if(oldData[key].Odds > data[key].Odds){
            data[key].increase = -1
          }
          if(oldData[key].Odds < data[key].Odds){
            data[key].increase = 1
          }
          if(oldData[key].Odds === data[key].Odds){
            data[key].increase = 0
          }
        }
      }
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
        oddsList: payload,
      };
    },
  },
};
