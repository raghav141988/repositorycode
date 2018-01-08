import { DataProperty } from './../data.property';
import { CardData } from '../layouts/CardData';
export const   monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
export class TimeLineData  {
   
    title:string;
    startTime:string;
    endTime:string;
    desc:string;
    isEdit:boolean;
    isDelete:boolean;
    showActions:boolean;
    
}