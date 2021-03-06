import { initialState, adapter, State } from './orders.state';
import * as actions from './orders.actions';

export function reducer(state: State = initialState, { type, payload }): State {
  switch (type) {
    case actions.LOAD_ORDERS:
      return state
    case actions.LOAD_ORDERS_SUCCESS:
      return adapter.addMany(payload, { ...state });
    case actions.LOAD_ORDERS_FAIL:
      return state;
    case actions.GET_ORDER:
      return { ...state };
    case actions.GET_ORDER_SUCCESS:
      return adapter.upsertOne(payload, { ...state });
    case actions.GET_ORDER_FAIL:
      return { ...state };
    case actions.CREATE_ORDER:
      return state;
    case actions.CREATE_ORDER_SUCCESS:
      return adapter.addOne(payload, { ...state });
    case actions.CREATE_ORDER_FAIL:
      return state;
    case actions.PAYMENT_ORDER:
      return state;
    case actions.PAYMENT_ORDER_SUCCESS:
      return adapter.updateOne({ id: payload._id, changes: payload }, { ...state });
    case actions.PAYMENT_ORDER_FAIL:
      return state;
    case actions.DELETE_ORDER:
      return state;
    case actions.DELETE_ORDER_SUCCESS:
      return adapter.removeOne(payload.id, { ...state });
    case actions.DELETE_ORDER_FAIL:
      return state;
    default:
      return state;
  }
}
