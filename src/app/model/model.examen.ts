import { Image } from "./model.image";
import Matiere from "./model.matiere"

export default class Examen {
    id !: number;
    etudiant!:String;
    note!:Number;
    date!:Date;
    matiere!:Matiere;
    images! : Image[]
    imageStr!:string
}