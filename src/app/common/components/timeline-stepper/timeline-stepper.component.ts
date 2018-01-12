import { editorConfig } from './../../editor-config';
import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { TemplateService } from './../layouts/templates/service/template.service';
import { Action } from './../Action';
import { TimeLineData } from './../model/TimeLineData';
import { Component,ViewChild,ElementRef ,Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


import { BaseComponentComponent } from '../base-component/base-component.component';
import { BaseTimelineComponent } from '../base-timeline/base-timeline.component';

@Component({
    moduleId: module.id,
    selector: 'timeline-stepper',
    templateUrl: 'timeline-stepper.component.html',
    styleUrls: ['timeline-stepper.component.scss']
})
export class TimelineStepperComponent extends BaseTimelineComponent {

    constructor(public _formBuilder: FormBuilder,public templateService:TemplateService,public templateSettings:TemplateSettingService) {
      super(_formBuilder,templateService,templateSettings);
     
     }
    

      
 
     
  
}
