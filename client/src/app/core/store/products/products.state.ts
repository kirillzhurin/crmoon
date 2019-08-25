import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import Product from '../../models/product';

export interface State extends EntityState<Product> {
  loading: boolean;
};

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product._id
});

export const initialState: State = adapter.getInitialState({
  loading: false
});
