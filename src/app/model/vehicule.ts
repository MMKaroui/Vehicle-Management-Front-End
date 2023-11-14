import { Fabricant } from "./fabricant";
import { Marque } from "./marque";
import { TypeCarburant } from "./type-carburant";
import { TypeVehicule } from "./typeVehicule";
 

export class Vehicule {
    
    idVehicule: number;
    num_vehicule :string;
    num_chassis: string;
    nbr_chv : number;
    date_circulation :Date;
   
    idFabricant:Fabricant;
    idModele:Marque;
    idTypeVehicule:TypeVehicule;
    idTypeCarburant:TypeCarburant;
	
}