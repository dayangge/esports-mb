import { getOddsList } from 'esports-core/services/api';

export default {
  namespace: 'oddsList',

  state: {
    oddsList: {
    },
    timestamp: ''
  },

  effects: {
    *fetchOddsList(_, { call, put, select }) {
      const time = yield select(
        state => state.oddsList.timestamp
      );
      let params = {};
      if(time !== ''){
        params = {
          timestamp: time
        }
      }
      const data = yield call(getOddsList, params);
      if(data === undefined){return}
      const timestamp = data.timestamp;
      const list = data.odd_lists;
      const oldData = yield select(
        state => state.oddsList.oddsList
      );

      for(let key in list){
        if(list.hasOwnProperty(key)) {
          if (oldData[key] === undefined) {
            oldData[key] = list[key]
          } else {
            if (oldData[key].odds > list[key].odds) {
              oldData[key].increase = -1
            }
            if (oldData[key].odds < list[key].odds) {
              oldData[key].increase = 1
            }
            if (oldData[key].odds === list[key].odds) {
              oldData[key].increase = 0
            }
          }
        }
      }
      yield put({
        type: 'save',
        payload: {
          timestamp,
          oddsList: oldData
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        oddsList: payload.oddsList,
        timestamp: payload.timestamp
      };
    },
  },
};
