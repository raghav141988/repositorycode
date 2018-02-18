import { ComponentType } from './../ComponentType';

import { editorConfig } from './../../editor-config';
import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { TemplateService } from './../layouts/templates/service/template.service';
import { ProfileDescription } from './ProfileDescription';
import { Component ,ViewChild,ElementRef,Input} from '@angular/core';
import { CardConfig } from '../layouts/CardConfig';
import { Subscription } from 'rxjs/Subscription';
import { PageSettings } from '../layouts/templates/PageSettings';
import { BaseComponentComponent } from '../base-component/base-component.component';
import {sequence, trigger, stagger, animate, style, group, query, transition, keyframes, animateChild} from '@angular/animations';


declare var jquery:any;
declare var $ :any;

@Component({
    moduleId: module.id,
    selector: 'description',
    templateUrl: 'description.component.html',
    animations:[
        trigger('stateAnimation', [
            transition('* => false', [
                style({
                    transform: 'translateX(-100px)',
                    opacity: 1
                }),
                animate('0.4s ease-out', style({
                    transform: 'translateX(0)',
                    opacity: 0
                }))
            ]),
            transition('* => enter', [
                style({
                    transform: 'translateX(100px)',
                    opacity: 0
                }),
                animate('0.4s ease-in', style({
                    transform: 'translateX(0)',
                    opacity: 1
                }))
            ]),
            transition('* => leave', [
                style({
                    transform: 'translateX(-100px)',
                    opacity: 1
                }),
                animate('0.4s ease-out', style({
                    transform: 'translateX(0)',
                    opacity: 0
                }))
            ]),
            transition('* => true', [
                style({
                    transform: 'translateX(100px)',
                    opacity: 0
                }),
                animate('0.4s ease-in', style({
                    transform: 'translateX(0)',
                    opacity: 1
                })),
                
            ])
        ]) ,
    
   
            
        
      ],
    styleUrls: ['description.component.scss']
})
export class DescriptionComponent extends BaseComponentComponent{
    @ViewChild('myTextArea') myTextArea:ElementRef;
    onHover=false;
    isTextEdit=false;
 
converted=false;
   // @Input('desc') content:ProfileDescription;
    content:ProfileDescription;
    constructor(public templateService:TemplateService,public templateSettings:TemplateSettingService) {
       
        super(templateService,templateSettings);

    }
    ngOnInit(){
       
        if(this.card.cardData){
            this.content=this.card.cardData;
           
        }else {
            this.content=this.templateService.getDescContent();
            this.card.cardData= this.content;
        }

        super.ngOnInit();
     
    }

    toggleTextEdit(){
        if(this.isTextEdit){
       

         this.isTextEdit=false;
       // var nicInstance = nicEditors.findEditor(this.myTextArea.nativeElement).getContent();
       var textareaValue =  $('.summernote').summernote('code');
     
        this.content.description=textareaValue;
        this.converted=false;
        }else {
        
         
         this.isTextEdit=true;
    
        
        
        }
       
      }
   
      ngDoCheck(){
       
        if(this.myTextArea && this.isTextEdit &&  !this.converted){
           
            $('.summernote').summernote(editorConfig);
         this.converted=true;
        }
      }
      onHoverSection(event:any){
        if(this.pageSettings.isPreviewMode ){
            this.onHover=false;
        }else {
            this.onHover=event;
        }
      
       
    }
    onEdit(event:any){
       
        this.templateSettings.broadCastEdit(this);
        this.isTextEdit=true;
    }
    handleEdit(data:any){
        if(data !=this){
          this.isTextEdit=false;
          this.converted=false;
        }
    }
}
