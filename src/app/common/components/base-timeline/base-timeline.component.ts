import { ComponentType } from './../ComponentType';
import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { editorConfig } from './../../editor-config';
import { TemplateService } from './../layouts/templates/service/template.service';
import { TimeLineData } from './../model/TimeLineData';
import { Component,ViewChild,ElementRef ,Input} from '@angular/core';
import { BaseComponentComponent } from '../base-component/base-component.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Action } from '../Action';
import { timeInterval } from 'rxjs/operator/timeInterval';

declare var jquery:any;
declare var $ :any;
 var  moment = require('moment');

export abstract class BaseTimelineComponent extends BaseComponentComponent{
    monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    addNew=false;
    isNewTimeTillToday:boolean;
    isTextEdit=false;
    converted=false;
    isDbClick=false;
    needsFocus:boolean=false;
    timeLineDataSet:TimeLineData[] ;
    @ViewChild('descTextArea') myTextArea:ElementRef;
    @ViewChild('editView') editView:ElementRef;
    constructor(public _formBuilder: FormBuilder,public templateService:TemplateService,public templateSettings:TemplateSettingService) {
        super(templateService,templateSettings);
       
       }
       ngOnInit() {
        
        if(this.card.cardData){
          this.timeLineDataSet=this.card.cardData;
        
         
      }else {
      this.timeLineDataSet=  this.templateService.getTimeLineData();
      this.card.cardData= this.timeLineDataSet;
        }  
      }

     

     onDeleteClicked(timeLineData:TimeLineData){
      var index = this.timeLineDataSet.indexOf(timeLineData, 0);
      if (index > -1) {
          this.timeLineDataSet.splice(index, 1);
      }
     }
     
       getStartTime(timeLineData:TimeLineData){
        
       var date = moment(timeLineData.startTime, "YYYY-MMM-DD");
       date.format();
       
        return  date.format();
    }
    startDateChange(timeLineData:TimeLineData,event:any){
      var startdateVal;
     
      var startdate = new Date(event);
     
      if(startdate){
         startdateVal=startdate.getFullYear()+'-' + this.monthNames[(startdate.getMonth())] + '-'+startdate.getDate();
      }
     
      timeLineData.startTime=startdateVal;
    }
   endDateChange(timeLineData:TimeLineData,event:any){
      var startdateVal;
     
      var startdate = new Date(event);
     
      if(startdate){
         startdateVal=startdate.getFullYear()+'-' + this.monthNames[(startdate.getMonth())] + '-'+startdate.getDate();
      }
     
      timeLineData.endTime=startdateVal;
    }
    editComplete(timeLineData:TimeLineData){
      timeLineData.isEdit=false;
      var nicInstance = $('.summernote').summernote('code');;
      timeLineData.desc=nicInstance;
    }
    getEndTime(timeLineData:TimeLineData){
        
        var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
     
      //  return new Date(timeLineData.endTime.replace(pattern,'$3-$2-$1')).toISOString();
        var date = moment(timeLineData.endTime, "YYYY-MMM-DD");
      
       return date.format();
    }
       onNewData(formData:any){
       // this.skills.push(new Skill(formData.skillName,formData.skillValue));
        //this.addNew=false;
        
        var startdateVal='';
        var endDateVal='';
        var startdate = new Date(formData.startDate);
        var endDate = new Date(formData.endDate);
        if(startdate){
           startdateVal=startdate.getFullYear()+'-' + this.monthNames[(startdate.getMonth())] + '-'+startdate.getDate();
        }
        if(endDate){
          endDateVal=endDate.getFullYear()+'-' + this.monthNames[(endDate.getMonth())] + '-'+endDate.getDate();
       }
       var nicInstance = $('.summernote').summernote('code');;
       endDateVal=endDateVal==='NaN-undefined-NaN'?'':endDateVal;
       console.log(endDateVal);
  
       let timeLinedata={
    'title':formData.title,
      'startTime':startdateVal,
      'endTime':endDateVal,
      'desc':nicInstance,
     'isEdit':false,
      'isDelete':false,
      'showActions':false,
      'isTillPresent':this.isNewTimeTillToday
       }
       this.timeLineDataSet.push(timeLinedata);
       this.addNew=false;
       this.isNewTimeTillToday=false;
      }
      cancelForm(){
        this.addNew=false;
      }
      cancelTimeLineEdit(timelineData:TimeLineData){
        timelineData.isEdit=false;
      }
      editTimeLine(formData:any,timelineData:TimeLineData){
        
      }
       onSettingsClicked(){
           //this.onAction.emit(Action.CONFIGURE);
       }
  
        onHoverTimeLine(event:any,timeLineData:TimeLineData){
          if(this.pageSettings.isPreviewMode ){
            timeLineData.showActions=false;
          }else {
            timeLineData.showActions=event;
          }
        
          
         // this.showIcons=event;
        }
        onAction(event:any,timeLineData:TimeLineData){
          let action:Action=event;
          if(action==Action.ADD){
            // this.addNew=true;
          }else if(action==Action.DELETE){
              //this.onDelete(skill);
          }else if(action==Action.CONFIGURE){
             //this.openDialog();
         }
      }
  
      toggleTextEdit(timelineData:TimeLineData){
     
       
       if(timelineData.isEdit) {
       timelineData.isEdit=false;
        var nicInstance = $('.summernote').summernote('code');;
        timelineData.desc=nicInstance;
        this.isDbClick=false;
        }else {
         // this.converted=true;
        
          timelineData.isEdit=true;
          this.converted=false;
        }
      }
  
      ngAfterViewInit(){
        if(this.myTextArea){
          $('.summernote').summernote(editorConfig);
        }
      }
      ngDoCheck(){
   
       if(this.myTextArea && !this.converted ){
         this.needsFocus=true;
         $('.summernote').summernote(editorConfig);
         this.converted=true;
        
        } 
  
      }
      onEndTImeChange(timeLine:TimeLineData,event:any){
        timeLine.isTillPresent=event.checked;
        if(event.checked){
        timeLine.endTime='';
        }
    }
      
}
