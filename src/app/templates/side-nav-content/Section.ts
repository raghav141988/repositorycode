import { SectionComponent } from './Component';

export class Section {
    id?:number;
    name:string;
    component:SectionComponent[];
    showComponent?:boolean;
    isSelected?:boolean;
}