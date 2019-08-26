import { Action } from '@ngrx/store';
import Product from '../../models/product';

export const LOAD_PRODUCTS = '[Products] Loading list of Product from server';
export const LOAD_PRODUCTS_SUCCESS = '[Products] List of Products are loaded';
export const LOAD_PRODUCTS_FAIL = '[Products] Products loading failed';
export const GET_PRODUCT = '[Products] Loading product by id from server';
export const GET_PRODUCT_SUCCESS = '[Products] Product are loaded successfully';
export const GET_PRODUCT_FAIL = '[Products] Product loading failed';
export const UPDATE_PRODUCT = '[Products] Update product data';
export const UPDATE_PRODUCT_SUCCESS = '[Products] Product data are updated';
export const UPDATE_PRODUCT_FAIL = '[Products] Product data updaiting failed';
export const CREATE_PRODUCT = '[Products] Request to add new product';
export const CREATE_PRODUCT_SUCCESS = '[Products] Request to add new product success';
export const CREATE_PRODUCT_FAIL = '[Products] Adding new product is failed';
export const DELETE_PRODUCT = '[Products] Delete product by id from server';
export const DELETE_PRODUCT_SUCCESS = '[Products] Product data deleted successfully';
export const DELETE_PRODUCT_FAIL = '[Products] Deleting product is failed';

export class LoadProductsAction implements Action {
  readonly type = LOAD_PRODUCTS;
  constructor(public payload?: string) {}
}

export class LoadProductsSuccessAction implements Action {
  readonly type = LOAD_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class LoadProductsFailAction implements Action {
  readonly type = LOAD_PRODUCTS_FAIL;
}
export class GetProductAction implements Action {
  readonly type = GET_PRODUCT;
  constructor(public payload: string) {}
}

export class GetProductSuccessAction implements Action {
  readonly type = GET_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
}

export class GetProductFailAction implements Action {
  readonly type = GET_PRODUCT_FAIL;
}

export class CreateProductAction implements Action {
  readonly type = CREATE_PRODUCT;
  constructor(public payload: Product) {}
};

export class CreateProductSuccessAction implements Action {
  readonly type = CREATE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
};

export class CreateProductFailAction implements Action {
  readonly type = CREATE_PRODUCT_FAIL;
};

export class UpdateProductAction implements Action {
  readonly type = UPDATE_PRODUCT;
  constructor(public payload: { id: string, name: string, image?: File }) {}
};

export class UpdateProductSuccessAction implements Action {
  readonly type = UPDATE_PRODUCT_SUCCESS;
  constructor(public payload: Product) {}
};

export class UpdateProductFailAction implements Action {
  readonly type = UPDATE_PRODUCT_FAIL;
};

export class DeleteProductAction implements Action {
  readonly type = DELETE_PRODUCT;
  constructor(public payload: string) {}
};

export class DeleteProductSuccessAction implements Action {
  readonly type = DELETE_PRODUCT_SUCCESS;
  constructor(public payload: string) {}
};

export class DeleteProductFailAction implements Action {
  readonly type = DELETE_PRODUCT_FAIL;
};

export type ProductActions =
  LoadProductsAction |
  LoadProductsSuccessAction |
  LoadProductsFailAction |
  GetProductAction |
  GetProductSuccessAction |
  GetProductFailAction |
  CreateProductAction |
  CreateProductSuccessAction |
  CreateProductFailAction |
  UpdateProductAction |
  UpdateProductSuccessAction |
  UpdateProductFailAction |
  DeleteProductAction |
  DeleteProductSuccessAction |
  DeleteProductFailAction;
