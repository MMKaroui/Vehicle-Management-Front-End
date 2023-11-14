import { Atelier } from "./atelier";
import { TypeReparation } from "./type-reparation";
import { Vehicule } from "./vehicule";

export class Facture {
     idFacture : number;
	  num_facture : string;
	 
	  date_facture : Date;
	   total : number ;
	  observation :string;
	
     idAtelier :  Atelier;
	
      idVehicule : Vehicule;
	
      idTypeReparation : TypeReparation;
}

