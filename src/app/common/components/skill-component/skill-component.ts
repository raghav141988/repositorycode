
import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { TemplateService } from './../layouts/templates/service/template.service';
import { FontColorChooserDialog } from './../font-color-chooser/chooser.dialog';
import { MatDialog } from '@angular/material';
import { Action } from './../Action';
import { Skill } from './../skill';
import { Component,Input } from '@angular/core';
import { CardConfig } from '../layouts/CardConfig';
import {sequence, trigger, stagger, animate, style, group, query , transition, keyframes, animateChild} from '@angular/animations';


import { BaseComponentComponent } from '../base-component/base-component.component';
import { BaseSkillComponent } from '../base-skill/base-skill.component';
@Component({

    selector: 'skill-component',
    templateUrl: 'skill-component.html',
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
      this.card.cardData= this.skills;
        }
        super.ngOnInit();
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
         if(action==Action.EDIT){
 // this.onEdit.emit(true);

    //CLOSE ALL OTHER TIMELINE EDITS
   this.cancelAllEdit(skill);
  //NOTIFY OTHER COMPONENTS ALSO TO CLOSE THEIER EDITS
      
     
         }
         else if(action==Action.ADD){
            this.cancelAllEdit(skill);
           
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
     handleEdit(data:any){
        if(data !=this){
         this.skills.forEach((eachSkill)=>{eachSkill.isEdit=false});
         this.addNew=false;
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

