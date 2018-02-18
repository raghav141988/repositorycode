
import { LinearTimelineComponent } from './components/linear-timeline/linear-timeline.component';
import { NoSanitizePipe } from './components/pipe/no-sanitize.pipe';
import { SafeHtmlDirective } from './components/directive/safe-html-directive';
import { TemplateSettingService } from './components/layouts/templates/template-setting-service';

import { HeaderContactComponent } from './components/header-contact/header-contact.component';
import { SimpleTimelineComponent } from './components/simple-timeline/simple-timeline.component';

import { TemplateChooserComponent } from './../template-chooser/template-chooser.component';
import { SkillCircleComponent } from './components/skill-circle/skill-circle.component';
import { StarSkillComponent } from './components/star-skill/star-skill.component';
import { DynamicLoadComponent } from './components/layouts/templates/dynamic-load.component';

import { SectionEditComponent } from './components/section-edit/section-edit.component';

import { TextEditDirective } from './components/directive/text.edit.directive';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { DescriptionComponent } from './components/description/description.component';
import { TimelineStepperComponent } from './components/timeline-stepper/timeline-stepper.component';

import { ChipComponent } from './components/chip/chip.component';
import { ResizableComponent } from './components/resume-header/resizeable.component';

import { ResumeHeaderComponent } from './components/resume-header/resume-header.component';
import { FontColorChooserComponent } from './components/font-color-chooser/font-color-chooser.component';
import { WrapperDirective } from './components/wrapper/wrapper.directive';



import { ChartComponent } from './components/chart/chart.component';
import { SkillComponent } from './components/skill-component/skill-component';
import { ResumeContentSelectorModule } from './components/resume-content-selector/resume-content-selector.module';

import { MaterialModule } from './../material/material.module';

import { HttpModule ,JsonpModule} from '@angular/http';
import { DragDropDirectiveModule} from 'angular4-drag-drop';

import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
//LAYOUT
import { Card } from './components/layouts/Card';
import { Layouts } from './components/layouts/layouts.component';
import { LayoutService } from './components/layouts/layouts.service';
import { RouterModule } from '@angular/router';

//TABLE RELATED 
import { SlimScrollModule } from 'ng2-slimscroll';



import { WrapperComponent } from './components/wrapper/wrapper.component';
import { DonutChartComponent } from './components/chart/donut-chart/donut-chart.component';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { FocusDirective } from './components/timeline-stepper/focus.directive';
import { BaseComponentComponent } from './components/base-component/base-component.component';
import { BaseSkillComponent } from './components/base-skill/base-skill.component';
import { BaseTimelineComponent } from './components/base-timeline/base-timeline.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { InViewportModule } from 'ng-in-viewport';
import { InViewportService } from 'ng-in-viewport';
import { VerticalTimelineComponent } from './components/vertical-timeline/vertical-timeline.component';
@NgModule({
    imports: [
      DragDropDirectiveModule,
      InViewportModule,
      SlimScrollModule,
    
        CommonModule,
        MaterialModule,
       
        HttpModule ,JsonpModule,
        RouterModule,
        FormsModule,ReactiveFormsModule,
        NgxImageGalleryModule,
        //DatePickerModule ,
    
        ResumeContentSelectorModule
      ],
      declarations:[
      
        Card,Layouts,ResumeHeaderComponent,NoSanitizePipe,
   FocusDirective,
      SkillComponent,
      ChartComponent,
      WrapperComponent,
      WrapperDirective,
      DonutChartComponent,
      ResizableComponent,
      FontColorChooserComponent,
      SafeHtmlDirective,
      ChipComponent,
      LinearTimelineComponent,
    
      TimelineStepperComponent,
      DescriptionComponent,
      ContactInfoComponent,
      TextEditDirective,
      SectionEditComponent,
      
      DynamicLoadComponent,
      StarSkillComponent,
      SkillCircleComponent,
      TemplateChooserComponent,
      SimpleTimelineComponent,HeaderContactComponent,
      TimelineComponent,
     
      VerticalTimelineComponent
      ],
     
      providers:[InViewportService,LayoutService,TemplateSettingService,
        ],
    entryComponents:[SkillComponent,TimelineStepperComponent,DescriptionComponent,ChipComponent,ChartComponent,ContactInfoComponent,StarSkillComponent,SkillCircleComponent,SimpleTimelineComponent,HeaderContactComponent,VerticalTimelineComponent,
      LinearTimelineComponent],
    exports: [
     
      CommonModule,
      HttpModule ,JsonpModule,
      FormsModule,ReactiveFormsModule,Card,Layouts,DragDropDirectiveModule, 
      
    ResumeHeaderComponent,
    FontColorChooserComponent,
    
    FontColorChooserComponent,
    ResumeContentSelectorModule,
    SkillComponent,
    ChartComponent,
    WrapperComponent,
    WrapperDirective,
    DonutChartComponent,
    ResizableComponent,
    ChipComponent,
    
    TimelineStepperComponent,
    DescriptionComponent,
    ContactInfoComponent,
    TextEditDirective,
    SectionEditComponent,
    DynamicLoadComponent,
    StarSkillComponent,
    SkillCircleComponent,
    TemplateChooserComponent,
    SlimScrollModule,
    SimpleTimelineComponent,
    HeaderContactComponent,
    NoSanitizePipe,
    TimelineComponent,
    LinearTimelineComponent,
    VerticalTimelineComponent
   
    //DatePickerModule
    ]
  })
  export class CommonSharedModule {}
