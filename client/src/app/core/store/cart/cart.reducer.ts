import { initialState, adapter, State } from './cart.state';
import * as actions from './cart.actions';
import { environment } from 'src/environments/environment'

export function reducer(state: State = initialState, {type, payload}): State {

  switch (type) {
    case actions.SYNC_LOCAL_STORAGE:
      const storageState = JSON.parse(localStorage.getItem('app.cart'));
      return storageState ? storageState : state;
    case actions.ADD_POSITION:
      let id = <number>adapter.selectId(payload);
      if (state.entities[id]) {
        const quantity = state.entities[id].quantity + payload.quantity;
        state = adapter.updateOne({id, changes: {quantity}}, { ...state });
      } else {
        state = adapter.addOne(payload, { ...state });
      }
      localStorage.setItem(environment.CART_STORAGE_KEY, JSON.stringify(state));
      return state;
    case actions.UPDATE_POSITION:
      state = adapter.updateOne({id: <string>adapter.selectId(payload), changes: payload}, { ...state });
      localStorage.setItem(environment.CART_STORAGE_KEY, JSON.stringify(state));
      return state;
    case actions.DELETE_POSITION:
      state = adapter.removeOne(<string>adapter.selectId(payload), { ...state });
      localStorage.setItem(environment.CART_STORAGE_KEY, JSON.stringify(state));
      return state;
    default:
      return state
  }
}
