export default interface Product {
  _id?: string;
  title: string;
  sku: string;
  shortDescription?: string;
  fullDescription?: string;
  price: number;
  images: string[];
  color?: string;
  size?: string;
  category: string;
  user?: string;
}
