export interface Property {
  capacity:      number;
  address:       string;
  pricePerNight: PricePerNight;
  propertyType:  string;
}
export interface PricePerNight {
  price: number;
  date:  string;
}
