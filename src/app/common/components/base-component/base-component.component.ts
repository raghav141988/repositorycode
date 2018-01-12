import { TemplateService } from './../layouts/templates/service/template.service';
import { Component } from '@angular/core';
import { CardConfig } from '../layouts/CardConfig';
import { Subscription } from 'rxjs/Subscription';
import { PageSettings } from '../layouts/templates/PageSettings';
import { TemplateSettingService } from '../layouts/templates/template-setting-service';
@Component({
    moduleId: module.id,
    selector: 'base-component',
    templateUrl: 'base-component.component.html',
    styleUrls: ['base-component.component.scss']
})
export class BaseComponentComponent {
    subscription: Subscription;
    pageSettings:PageSettings={};
    card:CardConfig;
    constructor(public templateService:TemplateService,public templateSettings:TemplateSettingService) {
        
         this.subscription = this.templateSettings.getSettingsSubscriber().subscribe(pageSettings => { this.pageSettings = pageSettings; 
            
             
             });
 
     }
     ngOnInit(){
        if(this.card.cardData){
          
            this.pageSettings=this.templateService.getSavedPageSettings();
            if(this.pageSettings===undefined){
                
                 this.pageSettings={};
               }
        }
      
     }
     ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
