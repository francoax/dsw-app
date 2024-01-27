import { PropertyType } from './property-type';

export interface PropertyCreation {
  capacity: string;
  address: string;
  location: string;
  propertyType: string;
  pricePerNight: string;
  image: string;
}
export interface Property {
  _id: string;
  capacity: number;
  address: string;
  pricePerNight: number;
  propertyType: PropertyType;
  location: {
    _id: string;
    name: string;
  };
  image: File;
}

export interface PropertyV2 {
  _id: string;
  capacity: number;
  address: string;
  pricePerNight: number;
  propertyType: PropertyType;
  location: {
    _id: string;
    id: string;
    name: string;
  };
  image: string;
}
