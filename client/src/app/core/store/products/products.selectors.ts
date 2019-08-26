import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, adapter } from './products.state';
import Product from 'src/app/core/models/product';

const selectProductsState = createFeatureSelector<State>('products');

export const { selectIds, selectAll, selectEntities, selectTotal } = adapter.getSelectors();

export const selectAllProducts = createSelector(
  selectProductsState,
  selectAll
);

export const selectProductEntities = createSelector(
  selectProductsState,
  selectEntities
)

export const selectProductById = createSelector(
  selectProductEntities,
  (entities, props: any) => entities[props.id]
);

export const selectProductsByCategory = createSelector(
  selectAllProducts,
  (products: Product[], props) => {
    console.log('>>>>>>', products);
    return products.filter(product => product.category === props.categoryId);
  }
)

export const isLoadingProducts = createSelector(
  selectProductsState,
  (state: State) => state.loading
)

