export interface SearchItems {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  items: Item[];
}

export interface SearchItem {
  author: {
    name: string;
    lastname: string;
  };
  item: Item;
}

export interface Item {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
  address?: string;
  sold_quantity?: number;
  description?: string;
  categories?: string[];
}

export interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

export interface Category {
  id: string;
  name: string;
  results: number;
}
