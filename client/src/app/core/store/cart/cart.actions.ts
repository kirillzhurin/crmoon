import { Action } from '@ngrx/store';
import Position from '../../models/position';
import { State } from './cart.state'

export const SYNC_LOCAL_STORAGE_START = '[Cart] Start sync with local storage';
export const SYNC_LOCAL_STORAGE_END = '[Cart] End sync with local storage';
export const ADD_POSITION = '[Cart] Add position to cart';
export const ADD_POSITION_SUCCESS = '[Cart] Add position to cart success';
export const UPDATE_POSITION = '[Cart] Update position to cart';
export const DELETE_POSITION = '[Cart] Delete position from cart';
export const CLEAR_CART = '[Cart] Delete all positions';

export class SyncLocalStorageStartAction implements Action {
  readonly type = SYNC_LOCAL_STORAGE_START;
}

export class SyncLocalStorageEndAction implements Action {
  readonly type = SYNC_LOCAL_STORAGE_END;
  constructor(public payload: State | null) {}
}

export class AddPositionAction implements Action {
  readonly type = ADD_POSITION;
  constructor(public payload: Position) {}
}

export class AddPositionSuccessAction implements Action {
  readonly type = ADD_POSITION_SUCCESS;
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

export class ClearCartAction implements Action {
  readonly type = CLEAR_CART;
}

export type CartActions =
  SyncLocalStorageStartAction |
  SyncLocalStorageEndAction |
  AddPositionAction |
  AddPositionSuccessAction |
  UpdatePositionAction |
  DeletePositionAction |
  ClearCartAction;
