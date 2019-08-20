import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import Category from '../../models/category';

export interface State extends EntityState<Category> {
  loading: boolean;
};

export const adapter: EntityAdapter<Category>  = createEntityAdapter<Category>({
  selectId: (category: Category) => category._id
});

export const initialState: State = adapter.getInitialState({
  loading: false
});
