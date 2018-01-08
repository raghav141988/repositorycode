import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { Action } from './../Action';

import { MatDialog } from '@angular/material';
import { FontColorChooserDialog } from './../font-color-chooser/chooser.dialog';
import { TemplateService } from './../layouts/templates/service/template.service';
import { ChipItem } from './ChipIem';
import { Component,Input } from '@angular/core';
import { CardConfig } from '../layouts/CardConfig';
import { Subscription } from 'rxjs/Subscription';
import { PageSettings } from '../layouts/templates/PageSettings';
@Component({
    moduleId: module.id,
    selector: 'chip-component',
    templateUrl: 'chip.component.html',
    styleUrls: ['chip.component.scss']
})
export class ChipComponent {
//@Input('skillsAsChips' )skillsAsChips:ChipItem[];
subscription: Subscription;
pageSettings:PageSettings={};
card:CardConfig;
fontColor="inherit";
skillsAsChips:ChipItem[];
addNew=false;
ngOnInit(){
    if(this.card.cardData){
        this.skillsAsChips=this.card.cardData;
       
    }else {
  this.skillsAsChips=this.templateService.getChips();
  this.card.cardData=this.skillsAsChips;
    }
}



choosenData:string="myClass";
//@Input('skills') skills:Skill[];



myClasses={};


constructor(public dialog: MatDialog,public templateService:TemplateService,public templateSettings:TemplateSettingService) {
    this.subscription = this.templateSettings.getSettingsSubscriber().subscribe(pageSettings => { this.pageSettings = pageSettings; 
        if(this.pageSettings.cssClass){
            this.choosenData=this.pageSettings.cssClass;
            console.log(this.choosenData);
        }
        
        });

}

openDialog(): void {
    let dialogRef = this.dialog.open(FontColorChooserDialog, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
   
      this.choosenData=result.background;
      this.fontColor=result.fontColor;
    
     // this.animal = result;
    });
  }


set tickInterval(v) {
    this._tickInterval = Number(v);
}
private _tickInterval = 1;

save(skill: ChipItem) {
    skill.isEdit = false;
}
cancel(skill: ChipItem) {
    skill.isEdit = false;
}
onDelete(skill:ChipItem){
    var index = this.skillsAsChips.indexOf(skill, 0);
    if (index > -1) {
        this.skillsAsChips.splice(index, 1);
    }
}

 onAction(event:any,skill:ChipItem){
     let action:Action=event;
     if(action==Action.ADD){
        this.addNew=true;
     }else if(action==Action.DELETE){
         this.onDelete(skill);
     }else if(action==Action.CONFIGURE){
        this.openDialog();
    }
 }
 onNewData(formData:any){
   this.skillsAsChips.push(new ChipItem(formData.skillName));
   this.addNew=false;
 }
 ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

}
