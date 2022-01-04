import { utils } from 'suid';
import moment from 'moment';
import { getEntityNames } from './service';

const { pathMatchRegexp, dvaModel } = utils;
const { modelExtend, model } = dvaModel;
const startFormat = 'YYYY-MM-DD 00:00';
const endFormat = 'YYYY-MM-DD 23:59';
export default modelExtend(model, {
  namespace: 'dataAudit',

  state: {
    startTime: moment().format(startFormat),
    endTime: moment().format(endFormat),
    className: '',
    operatorName: '',
    operationCategory: '',
    propertyName: '',
    operatorAccount: '',
    propertyRemark: '',
    entityNames: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/data/audit', location.pathname)) {
          dispatch({
            type: 'getDataRoleList',
          });
        }
      });
    },
  },
  effects: {
    *getDataRoleList({ payload }, { call, put }) {
      const re = yield call(getEntityNames, payload);
      if (re.success) {
        yield put({
          type: 'updateState',
          payload: {
            entityNames: re.data,
          },
        });
      }
    },
  },
});
