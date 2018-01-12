
import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { TemplateService } from './../layouts/templates/service/template.service';
import { FontColorChooserDialog } from './../font-color-chooser/chooser.dialog';
import { MatDialog } from '@angular/material';
import { Action } from './../Action';
import { Skill } from './../skill';
import { Component,Input } from '@angular/core';
import { CardConfig } from '../layouts/CardConfig';

import { BaseComponentComponent } from '../base-component/base-component.component';
import { BaseSkillComponent } from '../base-skill/base-skill.component';
@Component({

    selector: 'skill-component',
    templateUrl: 'skill-component.html',
    styleUrls: ['skill-component.scss']
})
export class SkillComponent extends BaseComponentComponent{
    /*MY TESTING */
    choosenData={};
    max = 10;
    min = 0;
    
    value = 0;
    
    addNew=false;

   
    //@Input('skills') skills:Skill[];
    skills:Skill[];

    ngOnInit(){
        if(this.card.cardData){
            this.skills=this.card.cardData;
           
        }else {
      this.skills=this.templateService.getSkills();
    
        }
    }
  
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
       
         // this.animal = result;
        });
      }


    save(skill: Skill) {
        skill.isEdit = false;
    }
    cancel(skill: Skill) {
        skill.isEdit = false;
    }
    onDelete(skill:Skill){
        var index = this.skills.indexOf(skill, 0);
        if (index > -1) {
            this.skills.splice(index, 1);
        }
    }

     onAction(event:any,skill:Skill){
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
       this.skills.push(new Skill(formData.skillName,formData.skillValue));
       this.addNew=false;
     }
   
}

