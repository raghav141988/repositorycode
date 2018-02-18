import { VerticalTimelineComponent } from './../../vertical-timeline/vertical-timeline.component';
import { LinearTimelineComponent } from './../../linear-timeline/linear-timeline.component';
import { PageSettings } from './PageSettings';
import { SimpleTimelineComponent } from './../../simple-timeline/simple-timeline.component';
import { SkillCircleComponent } from './../../skill-circle/skill-circle.component';
import { StarSkillComponent } from './../../star-skill/star-skill.component';
import { CardConfig } from './../CardConfig';
import { ChipComponent } from './../../chip/chip.component';
import { ChartComponent } from './../../chart/chart.component';
import { SkillComponent } from './../../skill-component/skill-component';
import { ContactInfoComponent } from './../../contact-info/contact-info.component';
import { DescriptionComponent } from './../../description/description.component';
import { TimelineStepperComponent } from './../../timeline-stepper/timeline-stepper.component';
import { TimelineComponent } from './../../timeline/timeline.component';



//import { Attribute,AttributeType,ValidationContext, RuleConfigurator  } from './../../../../../forms/shared';
import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';


;
import { Validators, FormControl } from '@angular/forms';






const components: { [type: number]: any } = {
  1: TimelineStepperComponent,
  2: DescriptionComponent,
  3: ContactInfoComponent,
  4: SkillComponent,
  5: ChartComponent,
  6: ChipComponent,
  7:StarSkillComponent,
  8:SkillCircleComponent,
  9:SimpleTimelineComponent,
  10:LinearTimelineComponent,
  11:VerticalTimelineComponent
};

@Directive({
  selector: '[dynamicLoadComponent]'



})
export class DynamicLoadComponent {
  @Input()
  card: CardConfig;
  @Input()
  pageSettings: PageSettings;
 


  component: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef

  ) { }

 

  ngOnInit() {
    
    if (!components[this.card.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.card.type}).
        Supported types: ${supportedTypes}`
      );
    }

    const component = this.resolver.resolveComponentFactory<any>(components[this.card.type]);
    this.component = this.container.createComponent(component);
   this.component.instance.card = this.card;

   this.component.instance.pageSettings = this.pageSettings;
  }

  


}
