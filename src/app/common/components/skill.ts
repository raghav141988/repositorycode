import { DataProperty } from './data.property';
import { CardData } from './layouts/CardData';
export class Skill extends CardData implements DataProperty {
    name:string;
    value:number;
    isEdit:boolean ;
    isDelete:boolean;
constructor( name:string, value:number){
  super();
  this.name=name;
  this.value=value;

}
    

  }