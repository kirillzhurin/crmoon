import { Action } from '@ngrx/store';
import Order from '../../models/order';

export const LOAD_ORDERS = '[Orders] Loading list of Order from server';
export const LOAD_ORDERS_SUCCESS = '[Orders] List of Orders are loaded';
export const LOAD_ORDERS_FAIL = '[Orders] Orders loading failed';
export const GET_ORDER = '[Orders] Loading order by id from server';
export const GET_ORDER_SUCCESS = '[Orders] Order are loaded successfully';
export const GET_ORDER_FAIL = '[Orders] Order loading failed';
export const CREATE_ORDER = '[Orders] Request to add new order';
export const CREATE_ORDER_SUCCESS = '[Orders] Request to add new order success';
export const CREATE_ORDER_FAIL = '[Orders] Adding new order is failed';
export const PAYMENT_ORDER = '[Orders] Request to pay for the order';
export const PAYMENT_ORDER_SUCCESS = '[Orders] Payment of order is success';
export const PAYMENT_ORDER_FAIL = '[Orders] Payment of order is failed';
export const DELETE_ORDER = '[Orders] Delete order by id from server';
export const DELETE_ORDER_SUCCESS = '[Orders] Order data deleted successfully';
export const DELETE_ORDER_FAIL = '[Orders] Deleting order is failed';

export class LoadOrdersAction implements Action {
  readonly type = LOAD_ORDERS;
  constructor(public payload: any = {}) {}
}

export class LoadOrdersSuccessAction implements Action {
  readonly type = LOAD_ORDERS_SUCCESS;
  constructor(public payload: Order[]) {}
}

export class LoadOrdersFailAction implements Action {
  readonly type = LOAD_ORDERS_FAIL;
}

export class GetOrderAction implements Action {
  readonly type = GET_ORDER;
  constructor(public payload: string) {}
}

export class GetOrderSuccessAction implements Action {
  readonly type = GET_ORDER_SUCCESS;
  constructor(public payload: Order) {}
}

export class GetOrderFailAction implements Action {
  readonly type = GET_ORDER_FAIL;
}

export class CreateOrderAction implements Action {
  readonly type = CREATE_ORDER;
  constructor(public payload: Order) {}
};

export class CreateOrderSuccessAction implements Action {
  readonly type = CREATE_ORDER_SUCCESS;
  constructor(public payload: Order) {}
};

export class CreateOrderFailAction implements Action {
  readonly type = CREATE_ORDER_FAIL;
};

export class PaymentOrderAction implements Action {
  readonly type = PAYMENT_ORDER;
  constructor(public payload: any) {}
};

export class PaymentOrderSuccessAction implements Action {
  readonly type = PAYMENT_ORDER_SUCCESS;
  constructor(public payload: Order) {}
};

export class PaymentOrderFailAction implements Action {
  readonly type = PAYMENT_ORDER_FAIL;
};

export class DeleteOrderAction implements Action {
  readonly type = DELETE_ORDER
  constructor(public payload: string) {}
}

export class DeleteOrderSuccessAction implements Action {
  readonly type = DELETE_ORDER_SUCCESS
  constructor(public payload: any) {}
}

export class DeleteOrderFailAction implements Action {
  readonly type = DELETE_ORDER_FAIL
}

export type OrderActions =
  LoadOrdersAction |
  LoadOrdersSuccessAction |
  LoadOrdersFailAction |
  GetOrderAction |
  GetOrderSuccessAction |
  GetOrderFailAction |
  CreateOrderAction |
  CreateOrderSuccessAction |
  CreateOrderFailAction |
  PaymentOrderAction |
  PaymentOrderSuccessAction |
  PaymentOrderFailAction |
  DeleteOrderAction |
  DeleteOrderSuccessAction |
  DeleteOrderFailAction;
