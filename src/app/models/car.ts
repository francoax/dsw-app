export interface Car {
  brand: string
  model: string
  year: string
  plate: string
  price: Price
  locality: string
}
export interface Price {
  date: string
  value: number
}

