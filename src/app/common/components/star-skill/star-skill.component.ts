
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
import { BaseRatingComponent } from '../base-rating/base-rating.component';
import {sequence, trigger, stagger, animate, style, group, query , transition, keyframes, animateChild} from '@angular/animations';

@Component({
    moduleId: module.id,
    selector: 'star-skill',
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
    templateUrl: 'star-skill.component.html',
    styleUrls: ['star-skill.component.scss']
})
export class StarSkillComponent extends BaseRatingComponent{
 
    constructor(public dialog: MatDialog,public templateService:TemplateService,public templateSettings:TemplateSettingService) {
        super(dialog,templateService,templateSettings)
    
    }
    handleEdit(data:any){
        if(data !=this){
            this.addNew=false;
         this.skills.forEach((eachSkill)=>{eachSkill.isEdit=false});
        }
    }

    onAction(event:any,skill:Skill){
        let action:Action=event;
        if(action==Action.EDIT){
            // this.onEdit.emit(true);
           this.cancelAllEdit(skill);
             //NOTIFY OTHER COMPONENTS ALSO TO CLOSE THEIER EDITS
                
                
                    }
        else if(action==Action.ADD){
          
           this.cancelAllEdit(skill);
           //NOTIFY OTHER COMPONENTS ALSO TO CLOSE THEIER EDITS
              
                this.addNew=true;

        }else if(action==Action.DELETE){
            this.onDelete(skill);
        }else if(action==Action.CONFIGURE){
           this.openDialog();
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
