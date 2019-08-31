import { Action } from '@ngrx/store';
import Order from '../../models/order';

export const LOAD_ORDERS = '[Orders] Loading list of Order from server';
export const LOAD_ORDERS_SUCCESS = '[Orders] List of Orders are loaded';
export const LOAD_ORDERS_FAIL = '[Orders] Orders loading failed';
export const CREATE_ORDER = '[Orders] Request to add new order';
export const CREATE_ORDER_SUCCESS = '[Orders] Request to add new order success';
export const CREATE_ORDER_FAIL = '[Orders] Adding new order is failed';
export const DELETE_ORDER = '[Orders] Delete order by id from server';
export const DELETE_ORDER_SUCCESS = '[Orders] Order data deleted successfully';
export const DELETE_ORDER_FAIL = '[Orders] Deleting order is failed';

export class LoadOrdersAction implements Action {
  readonly type = LOAD_ORDERS;
}

export class LoadOrdersSuccessAction implements Action {
  readonly type = LOAD_ORDERS_SUCCESS;
  constructor(public payload: Order[]) {}
}

export class LoadOrdersFailAction implements Action {
  readonly type = LOAD_ORDERS_FAIL;
}

export class CreateOrderAction implements Action {
  readonly type = CREATE_ORDER;
  constructor(public payload: { name: string, image?: File}) {}
};

export class CreateOrderSuccessAction implements Action {
  readonly type = CREATE_ORDER_SUCCESS;
  constructor(public payload: Order) {}
};

export class CreateOrderFailAction implements Action {
  readonly type = CREATE_ORDER_FAIL;
};

export type OrderActions =
  LoadOrdersAction |
  LoadOrdersSuccessAction |
  LoadOrdersFailAction |
  CreateOrderAction |
  CreateOrderSuccessAction |
  CreateOrderFailAction;
