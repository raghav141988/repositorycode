import { BaseComponentComponent } from './../base-component/base-component.component';
import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { TemplateService } from './../layouts/templates/service/template.service';
import { FontColorChooserDialog } from './../font-color-chooser/chooser.dialog';
import { MatDialog } from '@angular/material';
import { Skill } from './../skill';
import { Action } from './../Action';
import { Component,Input } from '@angular/core';
import { CardConfig } from '../layouts/CardConfig';
import { Subscription } from 'rxjs/Subscription';
import { PageSettings } from '../layouts/templates/PageSettings';


@Component({
  
    selector: 'skill-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['chart.component.scss']
})
export class ChartComponent extends BaseComponentComponent{
   
   
    
    max = 10;
    min = 0;
   
    value = 0;
   
    addNew=false;
    chartColor="inherit";
   skills: Skill[] ;
    constructor(public dialog: MatDialog,public templateService:TemplateService,public templateSettings:TemplateSettingService) {
       super(templateService,templateSettings);
    }
    ngOnInit(){
        if(this.card.cardData){
            this.skills=this.card.cardData;
          
        }else {
        this.skills=this.templateService.getSkillsForChart();
        }
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
    openDialog(): void {
        let dialogRef = this.dialog.open(FontColorChooserDialog, {
          width: '600px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
       
          this.pageSettings.colorTheme=result.colorValue;
       //  this. loadDonutChart()
         // this.animal = result;
        });
      }
     onAction(event:any,skill:Skill){
         let action:Action=event;
         if(action==Action.ADD){
            this.addNew=true;
         }else if(action==Action.DELETE){
             this.onDelete(skill);
         }
         else if(action==Action.CONFIGURE){
            this.openDialog();
        }
     }
     onNewData(formData:any){
       this.skills.push(new Skill(formData.skillName,formData.skillValue));
       this.addNew=false;
     }
   
     
}
