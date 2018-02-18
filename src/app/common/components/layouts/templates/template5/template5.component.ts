import { editorConfig } from './../../../../editor-config';
import { TemplateSettingService } from './../template-setting-service';
import { Section } from './../../../../../templates/side-nav-content/Section';
import { TemplateService } from './../service/template.service';
import { CardPlacing } from './../../../CardPlacing';
import { ActivatedRoute,Router } from '@angular/router';
import { ComponentType } from './../../../ComponentType';
import { ChipItem } from './../../../chip/ChipIem';
import { ProfileDescription } from './../../../description/ProfileDescription';
import { TimeLineData } from './../../../model/TimeLineData';
import { Skill } from './../../../skill';
import { ContactType } from './../../../contact-info/ContactType';
import { SectionEditDialog } from './../../../section-edit/section-edit.dialog';
import { MatDialog } from '@angular/material';
import { CardConfig } from './../../CardConfig';
import { Subscription } from 'rxjs/Subscription';
import { Component, ViewChild, Type, ElementRef, ViewChildren, TemplateRef, Input, ChangeDetectorRef } from '@angular/core';
import { PageSettings } from '../PageSettings';
import { BaseTemplateComponent } from '../base-template/base-template.component';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import {sequence, trigger, stagger, animate, style, group, query , transition, keyframes, animateChild} from '@angular/animations';


declare var jquery: any;
declare var $: any;

var max_pages = 100;
var page_count = 0;
declare var jquery: any;
declare var $: any;
function snipMe() {
 
  page_count++;
  if (page_count > max_pages) {
    return;
  }
  console.log($(this)[0].scrollHeight);
  console.log(Math.ceil($(this).innerHeight()));
  var long = $(this)[0].scrollHeight - Math.ceil($(this).innerHeight());
  var children = $(this).children().toArray(); // Save elements in this page to children[] array
  var removed = [];
  console.log(children);
  console.log(long);
  // Loop while this page is longer than an A4 page
  while (long > 0 && children.length > 0) {
    var child = children.pop(); // Remove last array element from the children[] array 
    console.log('detaching a child');
    console.log(child);
    $(child).detach();  // JQuery Method detach() removes the "child" element from DOM for the current page
    removed.push(child);  // Add element that was removed to the end of "removed" array
    long = $(this)[0].scrollHeight - Math.ceil($(this).innerHeight()); // Compute current size of the page 
  }
  // If elements were removed from the page 
  if (removed.length > 0) {
   
    var rev_removed = removed.reverse(); 
    console.log(rev_removed); // Reverse the order of the removed array
    var a4 = $('<div class="A4" style="background: white;width: 21cm;height: 29.7cm;display: block;margin: 0 auto;padding: 10px 25px;margin-bottom: 0.5cm;box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);overflow-y: scroll;box-sizing: border-box;font-size: inherit;" ></div>'); // Start a new page
    a4.append(rev_removed); // Add elements removed from last page to the new page
    $(this).after(a4); // Add the new page to the document
    snipMe.call(a4[0]); // Recursively call myself to adjust the remainder of the pages
  }
}


@Component({
  moduleId: module.id,
  selector: 'template5',
  animations: [
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
  templateUrl: 'template5.component.html',
  styleUrls: ['template5.component.scss']
})
export class Template5Component extends BaseTemplateComponent {

  themeName = "template5";
  url: string = "assets/img/headshot.jpg";
  dragStart = false;
  /* CONTACT INFO TABLE */

  getCardTemplate(cardId: number) {
    if (!this.dragStart) {
      //   console.log('Template to fetch for '+cardId);
      // console.log(this.cardToTemplateMaping[cardId ]);

      if (this.cardToTemplateMaping && this.cardToTemplateMaping[cardId]) {

        return this.cardToTemplateMaping[cardId];
      } else {
        return null;
      }
    }
  }

  ngOnInit() {

   
  
    super.ngOnInit();
    if(!this.cardsList){
      this.cardsList = this.service.getCardsListByTemplate('template5');
      this.pageSettings.colorTheme='#3949AB';
      this.pageSettings.fontColor='#fff';
      this.pageSettings.cssClass='Indigo-600';
     
      this.templateSettings.updateTemplateSetting(this.pageSettings);

      super.arrangeCards();
    }
    this.templateSettings.loadedSections(this.cardsList);
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
  openDialog(cardDetails: CardConfig): void {
    let dialogRef = this.dialog.open(SectionEditDialog, {
      width: '800px',
      data: cardDetails,
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
    if(this.pageSettings.isPreviewMode && !this.isPreviewComplete){
     super.rearrangeForPreview("mainArea");
     this.isPreviewComplete=true;
    }
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
  /* HANDLE DRAG AND DROP */
  onCardDrag(event: any, cardIndex: string) {




  }
  onDragEnd(event: any, cardIndex: string) {


    this.cardStartIndex = event;
  }

  onCardDrop(e: any, cardDetails: CardConfig) {
    this.dragStart = false;


    let dragCardIndex = this.cardStartIndex;
    let dropCardIndex = cardDetails.index;

    if (dragCardIndex === dropCardIndex) {
      return;
    }

    let tempCard = this.cardsList[dropCardIndex];
    let dragCard = this.cardsList[dragCardIndex];


    let dropCardId = tempCard.cardId;
    let dragCardId = dragCard.cardId;





    tempCard.index = dragCardIndex;
    dragCard.index = dropCardIndex;


    this.cardsList[dropCardIndex] = dragCard;

    this.cardsList[dragCardIndex] = tempCard;


    let tempTemplate = this.cardToTemplateMaping[dropCardIndex];
    this.cardToTemplateMaping[dropCardIndex] = this.cardToTemplateMaping[dragCardIndex];
    this.cardToTemplateMaping[dragCardIndex] = tempTemplate;

    tempCard.cardId = dragCardId;
    dragCard.cardId = dropCardId;

    this.dragStart = false;
  }




  /* HANDLING SECTION HOVER */
  toggleNameEdit() {


    if (this.isNameEdit) {
      this.isNameEdit = false;
      var nicInstance = $('.summernote').summernote('code');
      console.log(nicInstance);
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



  getThemeName(): string {
    return this.themeName;
  }

  handleEdit(data:any){
    
       
     this.cardsList.forEach((eachSkill)=>{
      if(eachSkill!=data){ 
      eachSkill.isEdit=false}
     });
    
}
ngAfterViewInit(){
  if(this.pageSettings.isPreviewMode){
  $('#mainArea').each(function() {
    console.log(this);
  snipMe.call(this);
});
}
}
}
