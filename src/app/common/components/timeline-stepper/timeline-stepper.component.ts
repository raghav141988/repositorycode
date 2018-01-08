import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { TemplateService } from './../layouts/templates/service/template.service';
import { Action } from './../Action';
import { TimeLineData } from './../model/TimeLineData';
import { Component,ViewChild,ElementRef ,Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CardConfig } from '../layouts/CardConfig';
import { Subscription } from 'rxjs/Subscription';
import { PageSettings } from '../layouts/templates/PageSettings';
declare var nicEditors:any;
 var  moment = require('moment');
@Component({
    moduleId: module.id,
    selector: 'timeline-stepper',
    templateUrl: 'timeline-stepper.component.html',
    styleUrls: ['timeline-stepper.component.scss']
})
export class TimelineStepperComponent {
  subscription: Subscription;
  pageSettings:PageSettings={};
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    addNew=false;
    isTextEdit=false;
    converted=false;
    isDbClick=false;
    needsFocus:boolean=false;
    @ViewChild('descTextArea') myTextArea:ElementRef;
    @ViewChild('editView') editView:ElementRef;
    
 card:CardConfig;
     monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

   //@Input('timeLineData')timeLineDataSet:TimeLineData[] ;
timeLineDataSet:TimeLineData[] ;

    constructor(private _formBuilder: FormBuilder,public templateService:TemplateService,public templateSettings:TemplateSettingService) {

      this.subscription = this.templateSettings.getSettingsSubscriber().subscribe(pageSettings => { this.pageSettings = pageSettings; 
       
        });
     }
    ngOnInit() {
      if(this.card.cardData){
        this.timeLineDataSet=this.card.cardData;
       this.pageSettings=this.templateService.getSavedPageSettings();
       if(this.pageSettings===undefined){
        
         this.pageSettings={};
       }
       
    }else {
    this.timeLineDataSet=  this.templateService.getTimeLineData();
      this.card.cardData=this.timeLineDataSet;
      }  
    }

      onEditClicked(timeLineData:TimeLineData){
        // this.onEdit.emit(true);
        timeLineData.isEdit=true;
       
        this.converted=false;
        this.needsFocus=false;
     }

     onDeleteClicked(timeLineData:TimeLineData){
      var index = this.timeLineDataSet.indexOf(timeLineData, 0);
      if (index > -1) {
          this.timeLineDataSet.splice(index, 1);
      }
     }
 
     onAddNew(timeLineData:TimeLineData){
      this.addNew=true;
      this.needsFocus=false;
      this.converted=false;
      //this.config.isDelete=true;
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
    var nicInstance = nicEditors.findEditor(this.myTextArea.nativeElement).getContent();
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
      
      var startdateVal;
      var endDateVal;
      var startdate = new Date(formData.startDate);
      var endDate = new Date(formData.endDate);
      if(startdate){
         startdateVal=startdate.getFullYear()+'-' + this.monthNames[(startdate.getMonth())] + '-'+startdate.getDate();
      }
      if(endDate){
        endDateVal=endDate.getFullYear()+'-' + this.monthNames[(endDate.getMonth())] + '-'+endDate.getDate();
     }
     var nicInstance = nicEditors.findEditor(this.myTextArea.nativeElement).getContent();
    

     let timeLinedata={
  'title':formData.title,
    'startTime':startdateVal,
    'endTime':endDateVal,
    'desc':nicInstance,
   'isEdit':false,
    'isDelete':false,
    'showActions':false
     }
     this.timeLineDataSet.push(timeLinedata);
     this.addNew=false;
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
        timeLineData.showActions=event;
        
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
      var nicInstance = nicEditors.findEditor(this.myTextArea.nativeElement).getContent();
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
     nicEditors.convertTextArea(this.myTextArea.nativeElement);
      }
    }
    ngDoCheck(){
 
     if(this.myTextArea && !this.converted ){
       this.needsFocus=true;
       nicEditors.convertTextArea(this.myTextArea.nativeElement);
       this.converted=true;
      
      } 

    }
    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }
}