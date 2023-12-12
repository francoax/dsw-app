export interface Car {
  id: string,
  brand: string,
  model: string,
  year: string,
  plate: string,
  price: Price,
  locality:{
    id : string,
    name: string;
  };
}
export interface Price {
  date: string,
  value: number
}

