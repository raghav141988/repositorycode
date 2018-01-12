import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { Action } from './../Action';

import { FontColorChooserDialog } from './../font-color-chooser/chooser.dialog';
import { TemplateService } from './../layouts/templates/service/template.service';
import { MatDialog } from '@angular/material';
import { Skill } from './../skill';
import { Component ,Input} from '@angular/core';
import { CardConfig } from '../layouts/CardConfig';
import { Subscription } from 'rxjs/Subscription';
import { PageSettings } from '../layouts/templates/PageSettings';
import { BaseRatingComponent } from '../base-rating/base-rating.component';
@Component({
    moduleId: module.id,
    selector: 'skill-circle',
    templateUrl: 'skill-circle.component.html',
    styleUrls: ['skill-circle.component.scss']
})
export class SkillCircleComponent extends BaseRatingComponent{
    constructor(public dialog: MatDialog,public templateService:TemplateService,public templateSettings:TemplateSettingService) {
        super(dialog,templateService,templateSettings)
    
    }
}
