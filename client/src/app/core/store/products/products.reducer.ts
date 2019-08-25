import { initialState, adapter, State} from './products.state';
import * as actions from './products.actions';

export function reducer(state: State = initialState, { type, payload }): State {
  switch (type) {
    case actions.LOAD_PRODUCTS:
      return { ...state, loading: true };
    case actions.LOAD_PRODUCTS_SUCCESS:
      return adapter.addMany(payload, { ...state, loading: false });
    case actions.LOAD_PRODUCTS_FAIL:
      return { ...state, loading: false };
    case actions.GET_PRODUCT:
      return { ...state, loading: true };
    case actions.GET_PRODUCT_SUCCESS:
      return adapter.upsertOne(payload, { ...state, loading: false });
    case actions.GET_PRODUCT_FAIL:
      return { ...state, loading: false };
    case actions.CREATE_PRODUCT:
      return { ...state, loading: true };
    case actions.CREATE_PRODUCT_SUCCESS:
      return adapter.addOne(payload, { ...state, loading: false });
    case actions.CREATE_PRODUCT_FAIL:
      return { ...state, loading: false };
    case actions.UPDATE_PRODUCT:
      return { ...state, loading: true };
    case actions.UPDATE_PRODUCT_SUCCESS:
      return adapter.updateOne({ id: payload._id, changes: payload }, { ...state, loading: false });
    case actions.UPDATE_PRODUCT_FAIL:
      return { ...state, loading: false };
    case actions.DELETE_PRODUCT:
      return { ...state, loading: true };
    case actions.DELETE_PRODUCT_SUCCESS:
      return adapter.removeOne(payload.id, { ...state, loading: false });
    case actions.DELETE_PRODUCT_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}
