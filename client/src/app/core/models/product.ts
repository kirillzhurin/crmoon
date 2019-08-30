export default interface Product {
  _id?: string;
  title: string;
  sku: string;
  shortDescription?: string;
  fullDescription?: string;
  price: number;
  images: string[];
  colors?: string;
  sizes?: string;
  category: string;
  user?: string;
}
