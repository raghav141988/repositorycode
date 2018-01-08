import { Action } from '../Action';
import { DataProperty } from '../data.property';
import { Component,Input,Output,EventEmitter } from '@angular/core';
@Component({
    selector: 'my-wrapper',
    templateUrl: './wrapper.component.html',
  styleUrls:['./wrapper.component.scss']
})
export class WrapperComponent {
    @Input('config') config:DataProperty;
    @Output() onEdit = new EventEmitter<any>();
  
    @Output() onAction = new EventEmitter<any>();
    constructor() {
     
    }
    showIcons=false;
  onHover(event:any) {
  
    console.log('hover clicked');
        this.showIcons=event;
     
       
    }
    onEditClicked(){
       // this.onEdit.emit(true);
       this.config.isEdit=true;
    
    }
    onDeleteClicked(){
       // this.onDelete.emit(true);
        
        this.onAction.emit(Action.DELETE);
     //this.config.isDelete=true;
    }

    onAddNew(){
        this.onAction.emit(Action.ADD);
     //this.config.isDelete=true;
    }

    onSettingsClicked(){
        this.onAction.emit(Action.CONFIGURE);
    }
}