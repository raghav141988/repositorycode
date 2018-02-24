import { ActivatedRoute,Router } from '@angular/router';
import { TemplateSettingService } from './../template-setting-service';
import { PageSettings } from './../PageSettings';
import { Section } from './../../../../../templates/side-nav-content/Section';
import { TemplateService } from './../service/template.service';
import { CardPlacing } from './../../../CardPlacing';

import { ComponentType } from './../../../ComponentType';
import { ChipItem } from './../../../chip/ChipIem';
import { ProfileDescription } from './../../../description/ProfileDescription';
import { TimeLineData } from './../../../model/TimeLineData';
import { Skill } from './../../../skill';
import { ContactType } from './../../../contact-info/ContactType';
import { SectionEditDialog } from './../../../section-edit/section-edit.dialog';
import { MatDialog } from '@angular/material';
import { CardConfig } from './../../CardConfig';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Component, ViewChild, Type, ElementRef, ViewChildren, TemplateRef, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { editorConfig } from '../../../../editor-config';
import { BaseTemplateComponent } from '../base-template/base-template.component';
import {sequence, trigger, stagger, animate, style, group, query , transition, keyframes, animateChild} from '@angular/animations';

declare var jquery: any;
declare var $: any;


@Component({
  moduleId: module.id,
  selector: 'template1',
  animations: [
    
    trigger('explainerAnim', [
      transition('* => *', [
     
        query('.header-title', style({ opacity: 0, transform: 'translateY(-70px)' })),

        query('.header-title', stagger('500ms', [
          animate('800ms  cubic-bezier(.75,-0.48,.26,1.52)', style({ opacity: 1, transform: 'translateY(0)' })),
        ])),

        query('.header-title', [
          animate(1000, style('*'))
        ]),
       
      
      ])
    ]),
    trigger('stateAnimation', [
      transition('* => false', [
          style({
              transform: 'rotateY(-180deg)',
              opacity: 1
          }),
          animate('0.4s', style({
              transform: 'rotateY(0deg)',
              opacity: 0
          }))
      ]),
      transition('* => true', [
          style({
              transform: 'rotateY(180deg)',
              opacity: 0
          }),
          animate('0.4s', style({
              transform: 'rotateY(0deg)',
              opacity: 1
          }))
      ])
  ]) ,

    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('500ms 1.2s', [
          animate('1s cubic-bezier(.75,-0.48,.26,1.52)', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.5}),
          
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),
          query(':leave', stagger('500ms 1.2s', [
            animate('1s cubic-bezier(.75,-0.48,.26,1.52)', keyframes([
              style({opacity: 1, transform: 'translateY(35px)', offset: 0}),
              style({opacity: .5, transform: 'translateY(-75%)',  offset: 0.5}),
            
              style({opacity: 0, transform: 'translateY(0)',     offset: 1.0}),
            ]))]), {optional: true})

      ])
    ])
    
      ],
 
  templateUrl: 'template1.component.html',
  styleUrls: ['template1.component.scss']
})
export class Template1Component extends BaseTemplateComponent {

  sub;
  themeName = "template1";
  



  /* CARD TEMPLATES */
  //  @ViewChild('cardContainer') cards: any;




  dragStart = false;
  /* CONTACT INFO TABLE */

  getCardTemplate(cardId: number) {
    if (!this.dragStart) {

      // console.log(this.cardToTemplateMaping[cardId ]);

      if (this.cardToTemplateMaping && this.cardToTemplateMaping[cardId]) {

        return this.cardToTemplateMaping[cardId];
      } else {
        return null;
      }
    }
  }



  /* FROM THE TEMPLATE HANDLE EACH SECTION SETTING */
  constructor(public dialog: MatDialog, private changeDetector: ChangeDetectorRef, public service: TemplateService, public templateSettings: TemplateSettingService,public dragula: DragulaService,public route: ActivatedRoute,
    public router: Router) {
    super(dialog, service, templateSettings,dragula,route,router,service);



  }
  addNewSection(section: Section, component: ComponentType,isAdd:boolean) {

    super.addNewSection(section, component,isAdd);
    this.changeDetector.detectChanges();

  }
ngAfterViewInit(){

}
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
   
    if(this.pageSettings.isPreviewMode && !this.isPreviewComplete){
      console.log('rearrange called'+this.pageSettings.isPreviewMode);
     super.rearrangeForPreview("mainArea");
     this.isPreviewComplete=true;
    }
  }
  ngOnInit() {

    
    
  
    super.ngOnInit();
    if(!this.cardsList){
      this.cardsList = this.service.getCardsListByTemplate('template1');
      this.pageSettings.colorTheme='#5E35B1';
      this.pageSettings.fontColor='#fff';
      this.pageSettings.cssClass='Deep-Purple-600';
     
      this.templateSettings.updateTemplateSetting(this.pageSettings);
      super.arrangeCards();
      
    }
    this.templateSettings.loadedSections(this.cardsList);
    
    

  }

  openDialog(cardDetails: CardConfig): void {
    let dialogRef = this.dialog.open(SectionEditDialog, {
      width: '800px',
      data: cardDetails,
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }

  /* READING IMAGE URL FOR PICTURE */
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
       
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  /* HANDLE THE CARD EDIT CLICK */

  /* HANDLE DRAG AND DROP */
  

  /* HANDLING SECTION HOVER */
  toggleNameEdit() {


    if (this.isNameEdit) {
      this.isNameEdit = false;
      var nicInstance = $('.summernote').summernote('code');
      this.userName = nicInstance;
      this.isDbClick = false;
    } else {
      // this.converted=true;
      this.isDbClick = true;
      this.isNameEdit = true;
      this.nameConverted = false;
    }
  }


  toggleDesigEdit() {


    if (this.isTitleEdit) {
      this.isTitleEdit = false;
      var nicInstance = $('.summernote').summernote('code');
      this.title = nicInstance;
      this.isDbClick = false;
    } else {
      // this.converted=true;
      this.isDbClick = true;
      this.isTitleEdit = true;
      this.titleConverted = false;
    }
  }
handleChildClass(){
  console.log('handling child class');
}

  ngDoCheck() {
    if (this.cardTemplates && this.isSecModified) {
      this.cardTemplates.toArray().forEach((el, index) => {
        this.cardToTemplateMaping[index] = el;



      });
      this.isSecModified = false;
    }

    if (this.titleText && !this.nameConverted) {

      $('.summernote').summernote(editorConfig);

      this.nameConverted = true;
    }
    if (this.designation && !this.titleConverted) {


      $('.summernote').summernote(editorConfig);
      this.titleConverted = true;
    }

  }

   ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
      
    }

  getThemeName(): string {
    return this.themeName;
  }


  handleEdit(data:any){
    
       
     this.cardsList.forEach((eachSkill)=>{
      if(eachSkill!=data){ 
      eachSkill.isEdit=false}
     });
    
}



}
