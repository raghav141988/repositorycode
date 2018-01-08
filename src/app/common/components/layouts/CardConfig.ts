import { CardData } from './CardData';
import { CardPlacing } from './../CardPlacing';
import { ComponentType } from './../ComponentType';
export interface CardConfig {
title?:string;
cardClass?:string;
isCardNavigationEnabled?:boolean;
actions?:any;
isDraggable?:boolean;
isDroppable?:boolean;
cardId?:String;
settings?:any;
animmate?:boolean;
index?:string;
isEnlarge?:boolean;
isEdit?:boolean;
showConfig?:boolean;
headerBackGround?:string;
headerFontColor?:string;
icon?:string;
type?:ComponentType;
cardPlacing?:string;
cardData?:any;
}