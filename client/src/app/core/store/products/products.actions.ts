import { Action } from '@ngrx/store';
import Product from '../../models/product';

export const LOAD_PRODUCTS = '[Product] Loading list of Product from server';
export const LOAD_PRODUCTS_SUCCESS = '[Product] List of Products are loaded';
export const LOAD_PRODUCTS_FAIL = '[Product] Products loading failed';
export const GET_PRODUCT = '[Product] Loading category by id from server';
export const GET_PRODUCT_SUCCESS = '[Product] Product are loaded successfully';
export const GET_PRODUCT_FAIL = '[Product] Product loading failed';
export const UPDATE_PRODUCT = '[Product] Update category data';
export const UPDATE_PRODUCT_SUCCESS = '[Product] Product data are updated';
export const UPDATE_PRODUCT_FAIL = '[Product] Product data updaiting failed';
export const CREATE_PRODUCT = '[Product] Request to add new category';
export const CREATE_PRODUCT_SUCCESS = '[Product] Request to add new category success';
export const CREATE_PRODUCT_FAIL = '[Product] Adding new category is failed';
export const DELETE_PRODUCT = '[Product] Delete category by id from server';
export const DELETE_PRODUCT_SUCCESS = '[Product] Product data deleted successfully';
export const DELETE_PRODUCT_FAIL = '[Product] Deleting category is failed';

export class LoadProductsAction implements Action {
  readonly type = LOAD_PRODUCTS;
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
  constructor(public payload: { name: string, image?: File}) {}
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
