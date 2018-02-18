import { UIType } from './../contact-info/UIType';
import { CardConfig } from './../layouts/CardConfig';
import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { ContactType } from './../contact-info/ContactType';

import { TemplateService } from './../layouts/templates/service/template.service';
import {sequence, trigger, stagger, animate, style, group, query , transition, keyframes, animateChild} from '@angular/animations';


import { Component ,Input} from '@angular/core';
import { BaseComponentComponent } from '../base-component/base-component.component';
@Component({
    moduleId: module.id,
    selector: 'header-contact',
    animations:[
      trigger('stateAnimation', [
          transition('* => false', [
              style({
                  transform: 'rotateY(-180deg)',
                  opacity: 1
              }),
              animate('0.4s', style({
                  transform: 'rotateY(0deg)',
                  opacity: 0
              }))
          ]),
          transition('* => true', [
              style({
                  transform: 'rotateY(180deg)',
                  opacity: 0
              }),
              animate('0.4s', style({
                  transform: 'rotateY(0deg)',
                  opacity: 1
              }))
          ])
      ]) ,
  
      trigger('listAnimation', [
          transition('* => *', [
    
            query(':enter', style({ opacity: 0 }), {optional: true}),
    
            query(':enter', stagger('300ms', [
              animate('0.4s ease-in', keyframes([
                style({opacity: 0, transform: 'translateX(-75%)', offset: 0}),
                style({opacity: .5, transform: 'translateX(35px)',  offset: 0.5}),
                style({opacity: 1, transform: 'translateX(0)',     offset: 1.0}),
              ]))]), {optional: true}),
              query(':leave', stagger('300ms', [
                  animate('0.4s ease-out', keyframes([
                    style({opacity: 1, transform: 'translateX(0)', offset: 0}),
                    style({opacity: .5, transform: 'translateX(35px)',  offset: 0.3}),
                    style({opacity: 0, transform: 'translateX(-75%)',     offset: 1.0}),
                  ]))]), {optional: true}),

                  

              /*    query('@slideIn', [
                      stagger(500, [
                          animateChild()
                      ]),
                  ], { optional: true })*/

          ]),
          
      
    ])],
    templateUrl: 'header-contact.component.html',
    styleUrls: ['header-contact.component.scss']
})
export class HeaderContactComponent {
// @Input('contactTypes') contactTypes:ContactType[];
@Input('contactTypes')contactTypes:ContactType[];
uiType:UIType;
addNew=false;
showActions=false;
edit=false;
constructor(public templateService:TemplateService,public templateSettings:TemplateSettingService) {
   
    
}
ngOnInit(){
  
    
}
  onHoverContact(event:any){
  //  contact.showActions=event;
  if(this.templateService.getSavedPageSettings().isPreviewMode ){
    this.showActions=false;
  }else {
    this.showActions=event;
  }
 
  }
  onEditClicked(){
    this.edit=true;
 
 }
 onNewData(formData:any){
  this.contactTypes.push(new ContactType(formData.contactName,"",formData.contactValue));
  this.addNew=false;
}
 cancel() {
  this.edit=false;
}
 save() {
  this.edit=false;
}
cancelForm(){
    this.addNew=false;
}
 onDeleteClicked(contact:ContactType){
  var index = this.contactTypes.indexOf(contact, 0);
  if (index > -1) {
      this.contactTypes.splice(index, 1);
  }
 }

 onAddNew(contact:ContactType){
  this.addNew=true;
  //this.config.isDelete=true;
 }
 handleEdit(data:any){
    if(data !=this){
        this.addNew=false;
     this.contactTypes.forEach((eachSkill)=>{eachSkill.isEdit=false});
    }
}
}