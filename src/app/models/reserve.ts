interface Reserve {
  _id?: string;
  date_start: string;
  date_end: string;
  user?: string;
  packageReserved: string;
}

export default Reserve;
