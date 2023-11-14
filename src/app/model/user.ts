import { Role } from "./role";
import { Etat } from "./etat";

export class User {
    
      id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    login: string;
    password: string;
    date_creation :Date;
    date_update :Date;
    idRole:Role;
    idEtat:Etat
}
