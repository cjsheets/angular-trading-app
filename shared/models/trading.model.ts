export interface Records {
  _id      ?: string;
  id        : string;
  owner     : string;
  name      : string;
  artist    : string;
  image     : string;
  available : boolean;
}

export interface Traders {
  _id      ?: string;
  id        : string;
  requests ?: Transaction[];
  offers   ?: Transaction[];
}

export interface Transaction {
  requestor_id  : string,
  owner_id      : string,
  record_id     : string;
  loan_status   : boolean;
}
