import { TemplateService } from './../layouts/templates/service/template.service';
import { Component,Input } from '@angular/core';
import { CardConfig } from '../layouts/CardConfig';
import { Subscription } from 'rxjs/Subscription';
import { PageSettings } from '../layouts/templates/PageSettings';
import { TemplateSettingService } from '../layouts/templates/template-setting-service';
import {sequence, trigger, stagger, animate, style, group, query , transition, keyframes, animateChild} from '@angular/animations';


export  abstract class BaseComponentComponent {
    subscription: Subscription;
    editInfosubscription: Subscription;
   @Input('pageSettings')pageSettings:PageSettings={};
   
    card:CardConfig;
  showContent:boolean=true;
  choosenData:any="myClass";
    constructor(public templateService:TemplateService,public templateSettings:TemplateSettingService) {
        
         this.subscription = this.templateSettings.getSettingsSubscriber().subscribe(pageSettings => { this.pageSettings = pageSettings; 
            console.log("in base component ::"+this.pageSettings.isPreviewMode);
           // setTimeout(()=>{
                this.showContent=this.pageSettings.showContent===undefined?true:this.pageSettings.showContent;
          //  }, 1000);
         
        
                if(this.pageSettings.cssClass){
                    this.choosenData=this.pageSettings.cssClass;
                  
                }
                
              
             
             });
 
             this.editInfosubscription = this.templateSettings.getEditInfoSubscriber().subscribe(data => { 
                                this.handleEdit(data);
                              
                             
                             });
 
                             
     }
     public abstract handleEdit(data:any);
     ngOnInit(){
        if(this.card.cardData){
          
            this.pageSettings=this.templateService.getSavedPageSettings();
            if(this.pageSettings===undefined){
                
                 this.pageSettings={};
               }
        }
        this.choosenData=this.pageSettings.cssClass;
     }
   
     ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
        this.editInfosubscription.unsubscribe();
    }
}
