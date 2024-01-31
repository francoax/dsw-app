import { Car } from './car';
import { MedicalAssistance } from './medical-assistance';
import { Property } from './property';

interface Package {
  id: string;
  type: string;
  property: Property;
  car: Car;
  medicalAssistance: MedicalAssistance;
  image: string;
  discount: number;
}

export interface PackageAgent {
  type: string;
  property: string;
  car: string;
  medicalAssistance: string;
  image: string;
  discount?: number;
}

export default Package;
