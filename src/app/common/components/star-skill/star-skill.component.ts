import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { Action } from './../Action';

import { FontColorChooserDialog } from './../font-color-chooser/chooser.dialog';
import { TemplateService } from './../layouts/templates/service/template.service';
import { MatDialog } from '@angular/material';
import { Skill } from './../skill';
import { Component,Input } from '@angular/core';
import { CardConfig } from '../layouts/CardConfig';
import { Subscription } from 'rxjs/Subscription';
import { PageSettings } from '../layouts/templates/PageSettings';
@Component({
    moduleId: module.id,
    selector: 'star-skill',
    templateUrl: 'star-skill.component.html',
    styleUrls: ['star-skill.component.scss']
})
export class StarSkillComponent {
    subscription: Subscription;
    pageSettings:PageSettings={};
    addNew=false;
    card:CardConfig;
    choosenData:string="myClass";
    //@Input('skills') skills:Skill[];
    skills:Skill[];

    ngOnInit(){
        if(this.card.cardData){
            this.skills=this.card.cardData;
            this.pageSettings=this.templateService.getSavedPageSettings();
            if(this.pageSettings===undefined){
                
                 this.pageSettings={};
               }
        }else {
      this.skills=this.templateService.getStarSkills();
      this.card.cardData=this.skills;
        }
    }
  
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
        
         // this.animal = result;
        });
      }


    set tickInterval(v) {
        this._tickInterval = Number(v);
    }
    private _tickInterval = 1;

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
     ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
