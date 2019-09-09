import Position from './position';

export default interface Order {
  _id?: string;
  email: string;
  phone: string;
  name: string;
  surname: string;
  city: string;
  address: string;
  paid: boolean;
  date?: Date;
  list: Position[];
  user?: string;
  total?: number;
  quantity?: number;
  order?: number;
}
