export interface iLogin {
    name: string;
    id_user: string;
    email: string;
    phone: string;
    token: string;
}

export interface iTrajeto { 
  id_router:number;
  id_user:number;
  b_km:number;
  b_data:string;
  b_hora:string;
  b_latitude:string;
  b_longitude:string;
  f_km:string;
  f_data:string;
  f_hora:string;
  f_latitude:string;
  f_longitude:string;
}