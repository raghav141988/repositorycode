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
import {sequence, trigger, stagger, animate, style, group, query , transition, keyframes, animateChild} from '@angular/animations';


@Component({
  
    selector: 'skill-chart',
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
        this.card.cardData= this.skills;
        }
        super.ngOnInit();
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
         if(action==Action.EDIT){
            this.cancelAllEdit(skill);
                    }
        else
         if(action==Action.ADD){
            this.cancelAllEdit(skill);
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
   
     handleEdit(data:any){
        if(data !=this){
            this.addNew=false;
         this.skills.forEach((eachSkill)=>{eachSkill.isEdit=false});
        }
    }

    cancelAllEdit(skill:Skill){
        this.addNew=false;
        this.skills.forEach((eachSkill) => {
            
               if (eachSkill !=skill){
                eachSkill.isEdit=false;

               }
           });
           this.templateSettings.broadCastEdit(this);
    }
    
}
