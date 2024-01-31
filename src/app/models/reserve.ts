import { Car } from './car';
import { MedicalAssistance } from './medical-assistance';
import { PropertyType } from './property-type';

interface Reserve {
  _id?: string;
  date_start: string;
  date_end: string;
  user?: string;
  packageReserved: string;
  totalPrice: number;
}

export interface ReserveList {
  _id: string;
  date_start: string;
  date_end: string;
  user?: string;
  packageReserved: {
    property: {
      _id: string;
      capacity: number;
      address: string;
      pricePerNight: number;
      image: string;
      location: string;
      propertyType: PropertyType;
    };
    car: Car;
    medicalAssistance: MedicalAssistance;
  };
  totalPrice: number;
  createdAt: string;
}

export default Reserve;
