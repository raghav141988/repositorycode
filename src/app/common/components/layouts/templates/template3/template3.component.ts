import { DragulaService } from 'ng2-dragula';
import { editorConfig, basicEditorConfig } from './../../../../editor-config';
import { TemplateSettingService } from './../template-setting-service';
import { Section } from './../../../../../templates/side-nav-content/Section';
import { TemplateService } from './../service/template.service';
import { ChipComponent } from './../../../chip/chip.component';
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
import { Subscription } from 'rxjs/Subscription';
import { Component, ViewChild, Type, ElementRef, ViewChildren, TemplateRef, Input, ChangeDetectorRef } from '@angular/core';
import { PageSettings } from '../PageSettings';
import { BaseTemplateComponent } from '../base-template/base-template.component';
import { sequence, trigger, stagger, animate, style, group, query, transition, keyframes, animateChild } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';


declare var jquery: any;
declare var $: any;
declare var html2canvas;
declare var deflate;
import * as jsPDF from 'jspdf';

var max_pages = 100;
var page_count = 0;
declare var jquery: any;
declare var $: any;
function snipLeftRight(left, right, a4Area) {
  console.log('left' + left);
  console.log('right' + right);
  page_count++;
  if (page_count > max_pages) {
    return;
  }
  console.log($(right)[0].scrollHeight);
  console.log(Math.ceil($(right).innerHeight()));

  console.log('Left' + $(left)[0].scrollHeight);
  console.log('Left' + Math.ceil($(left).innerHeight()));

  var long = $(right)[0].scrollHeight - Math.ceil($(right).innerHeight());
  var leftLong = $(left)[0].scrollHeight - Math.ceil($(left).innerHeight());

  var children = $(right).children().toArray(); // Save elements in this page to children[] array
  var leftChildren = $(left).children().toArray();

  var removed = [];
  var leftRemoved = [];

  console.log(children);
  console.log(leftChildren);
  console.log(long);
  console.log(leftLong);
  // Loop while this page is longer than an A4 page
  while (long > 0 && children.length > 0) {
    var child = children.pop(); // Remove last array element from the children[] array 


    $(child).detach();  // JQuery Method detach() removes the "child" element from DOM for the current page
    removed.push(child);  // Add element that was removed to the end of "removed" array
    long = $(right)[0].scrollHeight - Math.ceil($(right).innerHeight()); // Compute current size of the page 
  }
  while (leftLong > 0 && leftChildren.length > 0) {
    var child = leftChildren.pop(); // Remove last array element from the children[] array 


    $(child).detach();  // JQuery Method detach() removes the "child" element from DOM for the current page
    leftRemoved.push(child);  // Add element that was removed to the end of "removed" array
    leftLong = $(left)[0].scrollHeight - Math.ceil($(left).innerHeight()); // Compute current size of the page 
  }

  // If elements were removed from the page 
  if (removed.length > 0 || leftRemoved.length > 0) {

    var rev_removed = removed.reverse();
    var rev_left_removed = leftRemoved.reverse();

    console.log(rev_removed); // Reverse the order of the removed array
    console.log(rev_left_removed);
    var a4 = $('<div class="A4-nopadding" style="background: white;width:21cm;height: 29.7cm;margin: 0 auto;margin-bottom: 0.5cm;box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);overflow-y: scroll;box-sizing: border-box;font-size: inherit;" >');
    var leftsideDiv = $('<div class="leftsideDiv" style="float:left;width:40%;height: 29.5cm;background:#ddd;">');
    leftsideDiv.append(rev_left_removed);
    //ADD LEFT SIDE EXTRA ELEMENTS
    leftsideDiv.append($('</div>'));

    var rightsideDiv = $('<div style="float:right;overflow-x:hidden;width:60%;height: 29.5cm;" class="rightsideDiv">');

    var clearBoth = $('<div style="clear:both" ></div>');
    //ADD RIGHT SIDE ELEMENTS
    rightsideDiv.append(rev_removed);
    rightsideDiv.append($('</div>'));
    // Start a new page
    //a4.append(rev_removed); 

    a4.append(leftsideDiv);
    a4.append(rightsideDiv);
    a4.append(clearBoth);

    a4.append('</div>');// Add elements removed from last page to the new page
    $(a4Area).after(a4);
    // Add the new page to the document
    snipLeftRight(leftsideDiv, rightsideDiv, a4Area); // Recursively call myself to adjust the remainder of the pages
  }
}


@Component({
  moduleId: module.id,
  selector: 'template3',
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
    ]),
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('500ms 1.2s', [
          animate('1s cubic-bezier(.75,-0.48,.26,1.52)', keyframes([
            style({ opacity: 0, transform: 'translateY(-85%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(65px)', offset: 0.5 }),

            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),
        query(':leave', stagger('500ms 1.2s', [
          animate('1s cubic-bezier(.75,-0.48,.26,1.52)', keyframes([
            style({ opacity: 1, transform: 'translateY(65px)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(-85%)', offset: 0.5 }),

            style({ opacity: 0, transform: 'translateY(-100%)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])

  ],
  templateUrl: 'template3.component.html',
  styleUrls: ['template3.component.scss']
})
export class Template3Component extends BaseTemplateComponent {

  themeName = "template3";

  public many: Array<string> = ['The', 'possibilities', 'are', 'endless!'];
  public many2: Array<string> = ['Explore', 'them'];

  /* DECLARE ALL THE VARIABLES OF THE Template1Component */
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
    if (!this.cardsList) {
      this.cardsList = this.service.getCardsListByTemplate('template3');
      this.pageSettings.colorTheme='#616161';
      this.pageSettings.fontColor='#fff';
      this.pageSettings.cssClass='Grey-700';
     
      this.templateSettings.updateTemplateSetting(this.pageSettings);
    
      super.arrangeCards();
    }
    this.templateSettings.loadedSections(this.cardsList);
  }
  /* FROM THE TEMPLATE HANDLE EACH SECTION SETTING */
  constructor(public dialog: MatDialog, private changeDetector: ChangeDetectorRef, public service: TemplateService, public templateSettings: TemplateSettingService, public dragula: DragulaService, public route: ActivatedRoute,
    public router: Router) {
    super(dialog, service, templateSettings, dragula, route, router,service);



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



    if (this.pageSettings.isPreviewMode && !this.isPreviewComplete) {
      this.isPreviewComplete = true;
      console.log('rearrange called');
      console.log($('#rightArea'));

      console.log($('#leftArea'));
      snipLeftRight($('#leftArea'), $('#rightArea'), '#A4Area');


    }
    this.changeDetector.detectChanges();

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




  ngDoCheck() {
    if (this.cardTemplates && this.isSecModified) {
      this.cardTemplates.toArray().forEach((el, index) => {
        this.cardToTemplateMaping[index] = el;



      });
      this.isSecModified = false;
    }

    if (this.titleText && !this.nameConverted) {

      $('.summernote').summernote(basicEditorConfig);

      this.nameConverted = true;
    }
    if (this.designation && !this.titleConverted) {


      $('.summernote').summernote(basicEditorConfig);
      this.titleConverted = true;
    }
  }
  addNewSection(section: Section, component: ComponentType, isAdd: boolean) {

    super.addNewSection(section, component, isAdd);
    this.changeDetector.detectChanges();


  }

  getThemeName(): string {
    return this.themeName;
  }
  handleEdit(data: any) {


    this.cardsList.forEach((eachSkill) => {
      if (eachSkill != data) {
        eachSkill.isEdit = false
      }
    });

  }

  download() {
    var count = $('.A4-nopadding').length;
    var curCount = 0;
    var doc = new jsPDF('p', 'mm', 'a4');
    console.log('count' + count);

    $('.top-header').each(function () {

      console.log('*********');
      console.log(this);
      console.log('count' + count);

      // this.style.width= "21cm";
      this.style.height = "29.7cm";


      var imgArray = [];




      setTimeout(() => {
        html2canvas(this).then((canvas) => {

          // canvas.width  = "21cm";
          this.style.height = "";


          var imgData = canvas.toDataURL('image/png');


          //$('#copyCanvas').append(a4);
          //  imgArray.push(imgData);
          var imgWidth = 210;
          var pageHeight = 295;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;


          var position = 0;

          doc.addImage(imgData, 'PNG', 0, 0, 210, 297, 'a' + curCount, 'FAST');


          /*
          Here are the numbers (paper width and height) that I found to work. 
          It still creates a little overlap part between the pages, but good enough for me.
          if you can find an official number from jsPDF, use them.
          */







          console.log('adding page');
          doc.addPage();









        });

      }, 1000);




    });
    $('.A4-nopadding').each(function () {
      console.log('*********');
      console.log(this);
      console.log('count' + count);

      // this.style.width= "21cm";
      this.style.height = "29.7cm";
      //   this.style.display="block";
      //   this.style.margin="0 auto";
      //   this.style.padding="10px 25px";


      var imgArray = [];




      setTimeout(() => {
        html2canvas(this).then((canvas) => {

          // canvas.width  = "21cm";

          curCount++;

          var imgData = canvas.toDataURL('image/png');
          console.log('******************');

          console.log('****************')


          //$('#copyCanvas').append(a4);
          //  imgArray.push(imgData);
          var imgWidth = 210;
          var pageHeight = 295;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;


          var position = 0;

          doc.addImage(imgData, 'PNG', 0, 5, 210, 297, 'a' + curCount, 'FAST');


          /*
          Here are the numbers (paper width and height) that I found to work. 
          It still creates a little overlap part between the pages, but good enough for me.
          if you can find an official number from jsPDF, use them.
          */






          if (curCount == count) {

            console.log('done');

            doc.save('file.pdf');
          } else {
            console.log('adding page');
            doc.addPage();
          }








        });

      }, 2000);


    }

    );










  }
}
