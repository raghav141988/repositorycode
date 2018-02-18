import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { BaseComponentComponent } from './../base-component/base-component.component';
import { TemplateService } from './../layouts/templates/service/template.service';
import { ContactType } from './ContactType';
import { Component ,Input} from '@angular/core';
import { CardConfig } from '../layouts/CardConfig';
import {sequence, trigger, stagger, animate, style, group, query , transition, keyframes, animateChild} from '@angular/animations';
import { concat } from 'rxjs/operators/concat';

@Component({
    moduleId: module.id,
    selector: 'contact-info',
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
    
            query(':enter', stagger('500ms', [
              animate('1s ease-in', keyframes([
                style({opacity: 0, transform: 'translateX(-75%)', offset: 0}),
                style({opacity: .5, transform: 'translateX(35px)',  offset: 0.5}),
                style({opacity: 1, transform: 'translateX(0)',     offset: 1.0}),
              ]))]), {optional: true}),
              query(':leave', stagger('300ms', [
                  animate('1s ease-out', keyframes([
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
    templateUrl: 'contact-info.component.html',
    styleUrls: ['contact-info.component.scss']
})
export class ContactInfoComponent extends BaseComponentComponent{
 // @Input('contactTypes') contactTypes:ContactType[];
 contactTypes:ContactType[];
 card:CardConfig;
 edit=false;
addNew=false;
showActions:false;
constructor(public templateService:TemplateService,public templateSettings:TemplateSettingService) {
  super(templateService,templateSettings);

}
ngOnInit(){
  if(this.card.cardData){
    this.contactTypes=this.card.cardData;
   
}else {
  this.contactTypes=this.templateService.getContactTypes();
  this.card.cardData=this.contactTypes;
}
super.ngOnInit();
}
  onHoverContact(event:any){
    if(this.pageSettings.isPreviewMode ){
        this.showActions=false;
    }else {
        this.showActions=event;
    }
   
  }
  onEditClicked(){
    // this.onEdit.emit(true);
    this.cancelAllEdit();
   
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
 onDeleteClicked(contact:ContactType){
  var index = this.contactTypes.indexOf(contact, 0);
  if (index > -1) {
      this.contactTypes.splice(index, 1);
  }
 }

 onAddNew(){
   //  this.cancelAllEdit(contact);
  this.addNew=true;
  //this.config.isDelete=true;
 }
 handleEdit(data:any){
    if(data !=this){
        this.addNew=false;
     this.contactTypes.forEach((eachSkill)=>{eachSkill.isEdit=false});
    }
}
cancelAllEdit(){
    this.addNew=false;
   
    
       this.templateSettings.broadCastEdit(this);
}

}
