import { createEntityAdapter, EntityState, EntityAdapter, IdSelector } from '@ngrx/entity';
import Position from '../../models/position';

export interface State extends EntityState<Position> {
  price: number
};

export const adapter: EntityAdapter<Position> = createEntityAdapter<Position>({
  selectId: ({ _id, color, size }: Position) => `${_id}_${size}_${color}`
});

export const initialState: State = adapter.getInitialState({
  price: 0
});
