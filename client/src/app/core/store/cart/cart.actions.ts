import { Action } from '@ngrx/store';
import Position from '../../models/position';

export const SYNC_LOCAL_STORAGE = '[Cart] Sync with local storage';
export const ADD_POSITION = '[Cart] Add position to cart';
export const UPDATE_POSITION = '[Cart] Update position to cart';
export const DELETE_POSITION = '[Cart] Delete position from cart';

export class SyncLocalStorageAction implements Action {
  readonly type = SYNC_LOCAL_STORAGE;
}

export class AddPositionAction implements Action {
  readonly type = ADD_POSITION;
  constructor(public payload: Position) {}
}

export class UpdatePositionAction implements Action {
  readonly type = UPDATE_POSITION;
  constructor(public payload: Position) {}
}

export class DeletePositionAction implements Action {
  readonly type = DELETE_POSITION;
  constructor(public payload: Position) {}
}

export type CartActions =
  SyncLocalStorageAction |
  AddPositionAction |
  DeletePositionAction;
