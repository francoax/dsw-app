import { Car } from "./car";
import { MedicalAssistance } from "./medical-assistance";
import { Property } from "./property";

interface Package {
  id: string;
  type: string;
  property: Property;
  car: Car;
  medicalAssistance: MedicalAssistance;
  image:string;
}

export interface PackageAgent {
  type: string;
  property: string;
  car: string;
  medicalAssistance: string;
  image: string;
}

export default Package;
