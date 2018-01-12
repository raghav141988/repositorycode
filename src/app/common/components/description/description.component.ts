
import { editorConfig } from './../../editor-config';
import { TemplateSettingService } from './../layouts/templates/template-setting-service';
import { TemplateService } from './../layouts/templates/service/template.service';
import { ProfileDescription } from './ProfileDescription';
import { Component ,ViewChild,ElementRef,Input} from '@angular/core';
import { CardConfig } from '../layouts/CardConfig';
import { Subscription } from 'rxjs/Subscription';
import { PageSettings } from '../layouts/templates/PageSettings';
import { BaseComponentComponent } from '../base-component/base-component.component';

declare var jquery:any;
declare var $ :any;

@Component({
    moduleId: module.id,
    selector: 'description',
    templateUrl: 'description.component.html',
    styleUrls: ['description.component.scss']
})
export class DescriptionComponent extends BaseComponentComponent{
    @ViewChild('myTextArea') myTextArea:ElementRef;
    
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
       console.log(textareaValue);
        this.content.description=textareaValue;
        this.converted=false;
        }else {
        
         
         this.isTextEdit=true;
    
        
        
        }
       
      }
   
      ngDoCheck(){
       
        if(this.myTextArea && this.isTextEdit &&  !this.converted){
            console.log( $('.summernote'));
            $('.summernote').summernote(editorConfig);
         this.converted=true;
        }
      }
    
}
