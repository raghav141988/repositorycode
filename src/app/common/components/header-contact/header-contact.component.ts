import { ContactType } from './../contact-info/ContactType';

import { TemplateService } from './../layouts/templates/service/template.service';

import { Component ,Input} from '@angular/core';
@Component({
    moduleId: module.id,
    selector: 'header-contact',
    templateUrl: 'header-contact.component.html',
    styleUrls: ['header-contact.component.scss']
})
export class HeaderContactComponent {
// @Input('contactTypes') contactTypes:ContactType[];
contactTypes:ContactType[];
addNew=false;
constructor(public templateService:TemplateService) {}
ngOnInit(){
  this.contactTypes=this.templateService.getHeaderContactTypes();
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

