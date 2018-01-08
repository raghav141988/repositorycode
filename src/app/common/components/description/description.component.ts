import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { TemplateService } from './../layouts/templates/service/template.service';
import { ProfileDescription } from './ProfileDescription';
import { Component ,ViewChild,ElementRef,Input} from '@angular/core';
import { CardConfig } from '../layouts/CardConfig';
import { Subscription } from 'rxjs/Subscription';
import { PageSettings } from '../layouts/templates/PageSettings';
declare var nicEditors:any;
@Component({
    moduleId: module.id,
    selector: 'description',
    templateUrl: 'description.component.html',
    styleUrls: ['description.component.scss']
})
export class DescriptionComponent {
    @ViewChild('myTextArea') myTextArea:ElementRef;
    card:CardConfig;
    isTextEdit=false;
    subscription: Subscription;
    pageSettings:PageSettings={};

   /*fontSize;
   color:
   padding {

   }
*/
converted=false;
   // @Input('desc') content:ProfileDescription;
    content:ProfileDescription;
    constructor(public templateService:TemplateService,public templateSettings:TemplateSettingService) {

        this.subscription = this.templateSettings.getSettingsSubscriber().subscribe(pageSettings => { this.pageSettings = pageSettings; 
           
            
            });

    }
    ngOnInit(){
        if(this.card.cardData){
            this.content=this.card.cardData;
            this.pageSettings=this.templateService.getSavedPageSettings();
            if(this.pageSettings===undefined){
                
                 this.pageSettings={};
               }
        }else {
            this.content=this.templateService.getDescContent();
            this.card.cardData= this.content;
        }
      
     
    }

    toggleTextEdit(){
        if(this.isTextEdit){
       

         this.isTextEdit=false;
        var nicInstance = nicEditors.findEditor(this.myTextArea.nativeElement).getContent();
        this.content.description=nicInstance;
        this.converted=false;
        }else {
        
         
         this.isTextEdit=true;
    
         if(this.myTextArea){
           
            }
        
        }
       
      }
   
      ngDoCheck(){
       
        if(this.myTextArea && this.isTextEdit &&  !this.converted){
         nicEditors.convertTextArea(this.myTextArea.nativeElement);
         this.converted=true;
        }
      }
      ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
