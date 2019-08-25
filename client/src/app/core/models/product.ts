export default interface Product {
  _id?: string;
  name: string;
  shortDescription?: string;
  fullDescription?: string;
  price: number;
  images: string[];
  color?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  category: string;
  user?: string;
}
