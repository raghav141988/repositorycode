import { editorConfig } from './../../../../editor-config';
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
declare var jquery: any;
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'template4',
  templateUrl: 'template4.component.html',
  styleUrls: ['template4.component.scss']
})
export class Template4Component extends BaseTemplateComponent {

  themeName = "template4";
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
    this.cardsList = this.service.getCardsListByTemplate('template4');

  }
  /* FROM THE TEMPLATE HANDLE EACH SECTION SETTING */
  constructor(public dialog: MatDialog, private changeDetector: ChangeDetectorRef, public service: TemplateService, public templateSettings: TemplateSettingService) {
    super(dialog, service, templateSettings);
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



  /* HANDLE THE CARD EDIT CLICK */
  onCardEdit(event: any, cardDetails: CardConfig) {
    this.openDialog(cardDetails);
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

  addNewSection(section: Section, component: ComponentType) {

    super.addNewSection(section, component);
    this.changeDetector.detectChanges();

  }

  getThemeName(): string {
    return this.themeName;
  }


}
