import { ComponentType } from './../../../ComponentType';
import { Section } from './../../../../../templates/side-nav-content/Section';
import { TemplateSettingService } from './../template-setting-service';
import { TemplateService } from './../service/template.service';
import { Component, Type, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core/src/change_detection/change_detector_ref';
import { Subscription } from 'rxjs/Subscription';
import { PageSettings } from '../PageSettings';
import { CardConfig } from '../../CardConfig';


@Component({
    moduleId: module.id,
    selector: 'base-template',
    templateUrl: 'base-template.component.html',
    styleUrls: ['base-template.component.scss']
})
export class BaseTemplateComponent {
    @ViewChildren('cardTemplates') cardTemplates: any;
    @ViewChild('titleText') titleText: ElementRef;
    @ViewChild('designation') designation: ElementRef;
    cardsList: CardConfig[];
    userName = "Your Name";
    cardToTemplateMaping: { [type: number]: Type<ViewChild> } = {};
    subscription: Subscription;
    pageSettings: PageSettings = {};
    photoHover: boolean;
    showPhoto: boolean = true;
    title = "Your Designation";
    isNameEdit = false;
    isTitleEdit = false;
    isSecModified = false;
    /* DECLARE EDITING IN TEXT AREA VARIABLES */
    isDbClick = false;
    nameConverted = false;
    titleConverted = false;

    //@ViewChild('descTextArea') myTextArea:ElementRef;

    /* HEADER CONFIGURATION */
    fontHeaderColor = "#fff";

    /* DECLARE ALL THE VARIABLES OF THE Template1Component */

    cardStartIndex: any;

    constructor(public dialog: MatDialog, public service: TemplateService, public templateSettings: TemplateSettingService) {
        this.subscription = this.templateSettings.getSettingsSubscriber().subscribe(pageSettings => {
        this.pageSettings = pageSettings;


        });

    }

    ngAfterViewInit() {

        this.cardTemplates.toArray().forEach((el, index) => {
            this.cardToTemplateMaping[index] = el;
        });



    }
    ngOnInit() {

        this.pageSettings = this.service.getSavedPageSettings();
        console.log(this.pageSettings);
        if (this.pageSettings === undefined) {

            this.pageSettings = {};
        }
    }


    onHoverSection(event: any, config: CardConfig) {
        config.showConfig = event;

    }
    /* HANDLE THE CARD EDIT CLICK */



    addNewSection(section: Section, component: ComponentType) {

        let newCard: CardConfig = {

            title: section.name,
            cardClass: 'col-md-6',
            isCardNavigationEnabled: true,
            isDraggable: true,
            isDroppable: true,
            cardId: "" + this.cardsList.length,
            index: "" + (this.cardsList.length),
            isEnlarge: false,
            type: component,
            cardPlacing: 'right'
        };
        this.cardsList.push(newCard);
        this.isSecModified = true;


    }

    geTemplateContent(): any {
        var templateContent = {
            sectionContent: this.cardsList
        }
        return templateContent;
    }

    onUserPhotoHover(event: any) {
        this.photoHover = event;

    }
    onPhotoHide() {
        this.showPhoto = false;
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}


