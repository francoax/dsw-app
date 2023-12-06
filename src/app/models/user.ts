export interface User {
  _id?: string;
  id?: string;
  name: string;
  lastname: string;
  tel: number;
  address: string;
  email: string;
  password?: string;
  role?: string;
}
