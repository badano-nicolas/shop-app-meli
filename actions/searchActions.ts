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
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  results: number;
}
