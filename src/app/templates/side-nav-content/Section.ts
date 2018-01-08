import { Component } from './Component';

export class Section {
    id?:number;
    name:string;
    component:Component[];
    showComponent?:boolean;
}