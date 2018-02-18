import { TemplateSettingService } from './../layouts/templates/template-setting-service';

import { TemplateService } from './../layouts/templates/service/template.service';
import { Action } from './../Action';
import { TimeLineData } from './../model/TimeLineData';
import { Component,ViewChild,ElementRef ,Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CardConfig } from '../layouts/CardConfig';
import { Subscription } from 'rxjs/Subscription';
import { PageSettings } from '../layouts/templates/PageSettings';
import { BaseComponentComponent } from '../base-component/base-component.component';
import { BaseTimelineComponent } from '../base-timeline/base-timeline.component';
declare var nicEditors:any;
import {sequence, trigger, stagger, animate, style, group, query, transition, keyframes, animateChild} from '@angular/animations';

@Component({
    moduleId: module.id,
    selector: 'simple-timeline',
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
  
      trigger('timelineListAnimation', [
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
    templateUrl: 'simple-timeline.component.html',
    styleUrls: ['simple-timeline.component.scss']
})
export class SimpleTimelineComponent extends BaseTimelineComponent {
  constructor(public _formBuilder: FormBuilder,public templateService:TemplateService,public templateSettings:TemplateSettingService) {
    super(_formBuilder,templateService,templateSettings);
   
   }

   handleEdit(data:any){
    if(data !=this){
        this.addNew=false;
     this.timeLineDataSet.forEach((timeLine)=>{timeLine.isEdit=false});
    }
}
onAddNew(timeLineData:TimeLineData){
    this.cancelAllEdit(timeLineData);
    this.addNew=false;
      this.addNew=true;
      this.needsFocus=true;
      this.converted=false;
      //this.config.isDelete=true;
     } 
onEditClicked(timeLineData:TimeLineData){
    // this.onEdit.emit(true);

    //CLOSE ALL OTHER TIMELINE EDITS
    this.cancelAllEdit(timeLineData);
   
    
    timeLineData.isEdit=true;
   
    this.converted=false;
    this.needsFocus=true;
 }
 cancelAllEdit(timeLineData:TimeLineData){
    this.addNew=false;
    this.timeLineDataSet.forEach((timeLine) => {
        
           if (timeLine !=timeLineData){
              timeLine.isEdit=false;
           }
       });
       this.addNew=false;
       //BROADCAST GLOBALY
       this.templateSettings.broadCastEdit(this);
}

}
