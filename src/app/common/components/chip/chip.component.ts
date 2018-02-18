import { BaseComponentComponent } from './../base-component/base-component.component';
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
import {sequence, trigger, stagger, animate, style, group, query , transition, keyframes, animateChild} from '@angular/animations';

@Component({
    moduleId: module.id,
    selector: 'chip-component',
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
    templateUrl: 'chip.component.html',
    styleUrls: ['chip.component.scss']
})
export class ChipComponent extends BaseComponentComponent {

fontColor="inherit";
skillsAsChips:ChipItem[];

addNew=false;
ngOnInit(){
    super.ngOnInit();
    if(this.card.cardData){
        this.skillsAsChips=this.card.cardData;
       
    }else {
  this.skillsAsChips=this.templateService.getChips();
  this.card.cardData=this.skillsAsChips;
    }
   
  
}




//@Input('skills') skills:Skill[];



myClasses={};


constructor(public dialog: MatDialog,public templateService:TemplateService,public templateSettings:TemplateSettingService) {
    super(templateService,templateSettings);
   

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
     if(action==Action.EDIT){
        // this.onEdit.emit(true);
       
           //CLOSE ALL OTHER TIMELINE EDITS
           this.cancelAllEdit(skill);
            
                }
    else
     if(action==Action.ADD){
        this.cancelAllEdit(skill);
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

 handleEdit(data:any){
    if(data !=this){
        this.addNew=false;
     this.skillsAsChips.forEach((eachSkill)=>{eachSkill.isEdit=false});
    }
}
cancelAllEdit(skill:ChipItem){
    this.addNew=false;
    this.skillsAsChips.forEach((eachSkill) => {
        
           if (eachSkill !=skill){
            eachSkill.isEdit=false;

           }
       });
       this.templateSettings.broadCastEdit(this);
}

}
