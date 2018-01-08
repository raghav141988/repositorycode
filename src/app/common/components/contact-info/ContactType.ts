import { CardData } from "../layouts/CardData";

export class ContactType extends CardData{
    contactType: string;
    icon:string;
    value:string;
    isEdit?:boolean;
    showActions?:boolean;

    constructor( contactType:string, icon:string,value:string){
        super();
        this.contactType=contactType;
        this.icon=icon;
        this.value=value;
      
      }

}


