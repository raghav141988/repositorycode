import { TemplateService } from './../layouts/templates/service/template.service';
import { ContactType } from './ContactType';
import { Component ,Input} from '@angular/core';
import { CardConfig } from '../layouts/CardConfig';

@Component({
    moduleId: module.id,
    selector: 'contact-info',
    templateUrl: 'contact-info.component.html',
    styleUrls: ['contact-info.component.scss']
})
export class ContactInfoComponent {
 // @Input('contactTypes') contactTypes:ContactType[];
 contactTypes:ContactType[];
 card:CardConfig;
addNew=false;
constructor(public templateService:TemplateService) {}
ngOnInit(){
  if(this.card.cardData){
    this.contactTypes=this.card.cardData;
   
}else {
  this.contactTypes=this.templateService.getContactTypes();
  this.card.cardData=this.contactTypes;
}
}
  onHoverContact(event:any,contact:ContactType){
    contact.showActions=event;
  }
  onEditClicked(contact:ContactType){
    // this.onEdit.emit(true);
    contact.isEdit=true;
 
 }
 onNewData(formData:any){
  this.contactTypes.push(new ContactType(formData.contactName,"",formData.contactValue));
  this.addNew=false;
}
 cancel(contact: ContactType) {
  contact.isEdit = false;
}
 save(contact: ContactType) {
  contact.isEdit = false;
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
}
