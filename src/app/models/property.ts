export class Property {
  capacity?:      number;
  address?:       string;
  pricePerNight?: PricePerNight;
  propertyType?:  string;
}
export class PricePerNight {
  price?: number;
  date?:  string;
}
