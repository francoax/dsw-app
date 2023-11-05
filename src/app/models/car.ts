interface Car {
  id?: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  price: { date: string; value: number };
  locality: string;
}

export default Car;
