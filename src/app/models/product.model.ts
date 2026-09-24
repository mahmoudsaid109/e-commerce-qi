export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  inStock?: boolean;
  rating: ProductRating;
}

interface ProductRating {
  rate: number;
  count: number;
}
