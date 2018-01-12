
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
@Component({
    moduleId: module.id,
    selector: 'star-skill',
    templateUrl: 'star-skill.component.html',
    styleUrls: ['star-skill.component.scss']
})
export class StarSkillComponent extends BaseRatingComponent{
 
    constructor(public dialog: MatDialog,public templateService:TemplateService,public templateSettings:TemplateSettingService) {
        super(dialog,templateService,templateSettings)
    
    }

}
