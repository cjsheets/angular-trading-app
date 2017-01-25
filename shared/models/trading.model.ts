export interface Records {
  id        : string;
  owner     : string;
  name      : string;
  artist    : string;
  image     : string;
  available : boolean;
}

export interface Traders {
  id        : string;
  requests ?: Transaction[];
  offers   ?: Transaction[];
}

export interface Transaction {
  book_id       : string;
  loan_status   : boolean;
}
