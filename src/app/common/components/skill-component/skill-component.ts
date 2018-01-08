import { PageSettings } from './../layouts/templates/PageSettings';
import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { TemplateService } from './../layouts/templates/service/template.service';
import { FontColorChooserDialog } from './../font-color-chooser/chooser.dialog';
import { MatDialog } from '@angular/material';
import { Action } from './../Action';
import { Skill } from './../skill';
import { Component,Input } from '@angular/core';
import { CardConfig } from '../layouts/CardConfig';
import { Subscription } from 'rxjs/Subscription';
@Component({

    selector: 'skill-component',
    templateUrl: 'skill-component.html',
    styleUrls: ['skill-component.scss']
})
export class SkillComponent {
    /*MY TESTING */
    autoTicks = false;
    disabled = false;
    invert = false;
    max = 10;
    min = 0;
    showTicks = false;
    step = 1;
    thumbLabel = false;
    value = 0;
    vertical = false;
    addNew=false;
    choosenData:string="myClass";
    subscription: Subscription;
    pageSettings:PageSettings={};
    //@Input('skills') skills:Skill[];
    skills:Skill[];
 card:CardConfig;
    ngOnInit(){
        if(this.card.cardData){
            this.skills=this.card.cardData;
            this.pageSettings=this.templateService.getSavedPageSettings();
            if(this.pageSettings===undefined){
                
                 this.pageSettings={};
               }
        }else {
      this.skills=this.templateService.getSkills();
      this.card.cardData=this.skills;
        }
    }
    get tickInterval(): number | 'auto' {
        return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
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

