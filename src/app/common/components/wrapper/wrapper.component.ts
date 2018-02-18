import { TemplateService } from './../layouts/templates/service/template.service';
import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { Action } from '../Action';
import { DataProperty } from '../data.property';

import { Component,Input,Output,EventEmitter } from '@angular/core';
import { PageSettings } from '../layouts/templates/PageSettings';
@Component({
    selector: 'my-wrapper',
    templateUrl: './wrapper.component.html',
  styleUrls:['./wrapper.component.scss']
})
export class WrapperComponent {
    @Input('config') config:DataProperty;
    @Output() onEdit = new EventEmitter<any>();
 
   
    @Output() onAction = new EventEmitter<any>();
    constructor(private templateService:TemplateService) {
      
    }
    showIcons=false;
  onHover(event:any) {
  
      if(this.templateService.getSavedPageSettings().isPreviewMode){
        this.showIcons=false;
      }
      else {
        this.showIcons=event;
      }
        
       
     
       
    }
    onEditClicked(){
       // this.onEdit.emit(true);
       this.config.isEdit=true;
       this.onAction.emit(Action.EDIT);
    
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