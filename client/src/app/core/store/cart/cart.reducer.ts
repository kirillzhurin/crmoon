import { initialState, adapter, State } from './cart.state';
import * as actions from './cart.actions';
import { environment } from 'src/environments/environment'

export function reducer(state: State = initialState, {type, payload}): State {
  switch (type) {
    case actions.SYNC_LOCAL_STORAGE_START:
      return state;
    case actions.SYNC_LOCAL_STORAGE_END:
      return payload ? payload : state;
    case actions.ADD_POSITION:
      return state;
    case actions.ADD_POSITION_SUCCESS:
      return adapter.addOne(payload, { ...state });
    case actions.UPDATE_POSITION:
      return adapter.updateOne({id: <string>adapter.selectId(payload), changes: payload}, { ...state });
    case actions.DELETE_POSITION:
      return adapter.removeOne(<string>adapter.selectId(payload), { ...state });
    case actions.CLEAR_CART:
      return adapter.removeAll(state);
    default:
      return state
  }
}
