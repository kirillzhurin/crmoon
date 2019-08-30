import Position from './position';

export default interface Order {
  _id?: string;
  date: Date;
  list: Position[];
  user?: string;
}
