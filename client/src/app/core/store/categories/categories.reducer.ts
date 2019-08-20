import { initialState, adapter, State } from './categories.state';
import * as actions from './categories.actions';

export function reducer(state: State = initialState, { type, payload }): State {
  switch (type) {
    case actions.LOAD_CATEGORIES:
      return { ...state, loading: true };
    case actions.LOAD_CATEGORIES_SUCCESS:
      return adapter.addMany(payload, { ...state, loading: false });
    case actions.LOAD_CATEGORIES_FAIL:
      return { ...state, loading: false };
    case actions.GET_CATEGORY:
      return { ...state, loading: true };
    case actions.GET_CATEGORY_SUCCESS:
      return adapter.upsertOne(payload, { ...state, loading: false });
    case actions.GET_CATEGORY_FAIL:
      return { ...state, loading: false };
    case actions.CREATE_CATEGORY:
      return { ...state, loading: true };
    case actions.CREATE_CATEGORY_SUCCESS:
      return adapter.addOne(payload, { ...state, loading: false });
    case actions.CREATE_CATEGORY_FAIL:
      return { ...state, loading: false };
    case actions.UPDATE_CATEGORY:
      return { ...state, loading: true };
    case actions.UPDATE_CATEGORY_SUCCESS:
      return adapter.updateOne({ id: payload._id, changes: payload }, { ...state, loading: false });
    case actions.UPDATE_CATEGORY_FAIL:
      return { ...state, loading: false };
    case actions.DELETE_CATEGORY:
      return { ...state, loading: true };
    case actions.DELETE_CATEGORY_SUCCESS:
      return adapter.removeOne(payload.id, { ...state, loading: false });
    case actions.DELETE_CATEGORY_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}
