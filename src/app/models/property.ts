import { PropertyType } from "./property-type";

export interface Property {
  _id: string;
  capacity: number;
  address: string;
  pricePerNight: PricePerNight;
  propertyType: string;
  location: {
    id : string,
    name: string;
  };
  image: File;
}
export interface PricePerNight {
  price: number;
  date: string;
}

export interface PropertyV2 {
  _id: string;
  capacity: number;
  address: string;
  pricePerNight: PricePerNight;
  propertyType: PropertyType;
  location: {
    name: string;
  };
  image: File;
}
export interface PricePerNight {
  price: number;
  date: string;
}