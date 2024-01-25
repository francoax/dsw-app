export interface Car {
  id: string;
  brand: string;
  model: string;
  year: string;
  plate: string;
  price: Price;
  locality: string;
}
export interface Price {
  date: string;
  value: number;
}
