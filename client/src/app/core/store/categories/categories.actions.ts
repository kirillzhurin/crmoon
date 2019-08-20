import { Action } from '@ngrx/store';
import Category from '../../models/category';

export const LOAD_CATEGORIES = '[Category] Loading list of Category from server';
export const LOAD_CATEGORIES_SUCCESS = '[Category] List of Categories are loaded';
export const LOAD_CATEGORIES_FAIL = '[Category] Categories loading failed';
export const GET_CATEGORY = '[Category] Loading category by id from server';
export const GET_CATEGORY_SUCCESS = '[Category] Category are loaded successfully';
export const GET_CATEGORY_FAIL = '[Category] Category loading failed';
export const UPDATE_CATEGORY = '[Category] Update category data';
export const UPDATE_CATEGORY_SUCCESS = '[Category] Category data are updated';
export const UPDATE_CATEGORY_FAIL = '[Category] Category data updaiting failed';
export const CREATE_CATEGORY = '[Category] Request to add new category';
export const CREATE_CATEGORY_SUCCESS = '[Category] Request to add new category success';
export const CREATE_CATEGORY_FAIL = '[Category] Adding new category is failed';
export const DELETE_CATEGORY = '[Category] Delete category by id from server';
export const DELETE_CATEGORY_SUCCESS = '[Category] Category data deleted successfully';
export const DELETE_CATEGORY_FAIL = '[Category] Deleting category is failed';

export class LoadCategoriesAction implements Action {
  readonly type = LOAD_CATEGORIES;
}

export class LoadCategoriesSuccessAction implements Action {
  readonly type = LOAD_CATEGORIES_SUCCESS;
  constructor(public payload: Category[]) {}
}

export class LoadCategoriesFailAction implements Action {
  readonly type = LOAD_CATEGORIES_FAIL;
}
export class GetCategoryAction implements Action {
  readonly type = GET_CATEGORY;
  constructor(public payload: string) {}
}

export class GetCategorySuccessAction implements Action {
  readonly type = GET_CATEGORY_SUCCESS;
  constructor(public payload: Category) {}
}

export class GetCategoryFailAction implements Action {
  readonly type = GET_CATEGORY_FAIL;
}

export class CreateCategoryAction implements Action {
  readonly type = CREATE_CATEGORY;
  constructor(public payload: { name: string, image?: File}) {}
};

export class CreateCategorySuccessAction implements Action {
  readonly type = CREATE_CATEGORY_SUCCESS;
  constructor(public payload: Category) {}
};

export class CreateCategoryFailAction implements Action {
  readonly type = CREATE_CATEGORY_FAIL;
};

export class UpdateCategoryAction implements Action {
  readonly type = UPDATE_CATEGORY;
  constructor(public payload: { id: string, name: string, image?: File }) {}
};

export class UpdateCategorySuccessAction implements Action {
  readonly type = UPDATE_CATEGORY_SUCCESS;
  constructor(public payload: Category) {}
};

export class UpdateCategoryFailAction implements Action {
  readonly type = UPDATE_CATEGORY_FAIL;
};

export class DeleteCategoryAction implements Action {
  readonly type = DELETE_CATEGORY;
  constructor(public payload: string) {}
};

export class DeleteCategorySuccessAction implements Action {
  readonly type = DELETE_CATEGORY_SUCCESS;
  constructor(public payload: string) {}
};

export class DeleteCategoryFailAction implements Action {
  readonly type = DELETE_CATEGORY_FAIL;
};

export type CategoryActions =
  LoadCategoriesAction |
  LoadCategoriesSuccessAction |
  LoadCategoriesFailAction |
  GetCategoryAction |
  GetCategorySuccessAction |
  GetCategoryFailAction |
  CreateCategoryAction |
  CreateCategorySuccessAction |
  CreateCategoryFailAction |
  UpdateCategoryAction |
  UpdateCategorySuccessAction |
  UpdateCategoryFailAction |
  DeleteCategoryAction |
  DeleteCategorySuccessAction |
  DeleteCategoryFailAction;
