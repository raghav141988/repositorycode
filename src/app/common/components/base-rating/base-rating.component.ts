import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { TemplateService } from './../layouts/templates/service/template.service';
import { BaseComponentComponent } from './../base-component/base-component.component';
import { Component } from '@angular/core';
import { Skill } from '../skill';
import { MatDialog } from '@angular/material';
import { FontColorChooserDialog } from '../font-color-chooser/chooser.dialog';
import { Action } from '../Action';


export abstract class BaseRatingComponent extends BaseComponentComponent{
    addNew=false;
    skills:Skill[];
     choosenData:string="myClass";
     ngOnInit(){
        if(this.card.cardData){
            this.skills=this.card.cardData;
          
        }else {
      this.skills=this.templateService.getStarSkills();
      this.card.cardData= this.skills;
    
        }
        super.ngOnInit();
    }
  
    myClasses={};
    constructor(public dialog: MatDialog,public templateService:TemplateService,public templateSettings:TemplateSettingService) {
        super(templateService,templateSettings)
    
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

    
     onNewData(formData:any){
       this.skills.push(new Skill(formData.skillName,formData.skillValue));
       this.addNew=false;
     }
     public abstract handleEdit(data:any);
}
