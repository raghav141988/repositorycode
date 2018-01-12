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
@Component({
    moduleId: module.id,
    selector: 'simple-timeline',
    templateUrl: 'simple-timeline.component.html',
    styleUrls: ['simple-timeline.component.scss']
})
export class SimpleTimelineComponent extends BaseTimelineComponent {
  constructor(public _formBuilder: FormBuilder,public templateService:TemplateService,public templateSettings:TemplateSettingService) {
    super(_formBuilder,templateService,templateSettings);
   
   }
}
