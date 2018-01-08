import { TemplateSettingService } from './../template-setting-service';
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
import { Subscription } from 'rxjs/Subscription';
import { Component, ViewChild, Type, ElementRef, ViewChildren,TemplateRef,Input,ChangeDetectorRef } from '@angular/core';
import { PageSettings } from '../PageSettings';
declare var nicEditors:any;

@Component({
    moduleId: module.id,
    selector: 'template5',
    templateUrl: 'template5.component.html',
    styleUrls: ['template5.component.scss']
})
export class Template5Component {
  subscription: Subscription;
  pageSettings:PageSettings={};
  photoHover:boolean;
  showPhoto:boolean=true;
  themeName="template5";
  isSecModified=false;
  url:string="assets/img/headshot.jpg";
  userName="Your Name";
  title="Your Designation";
    isNameEdit=false;
    isTitleEdit=false;
  /* DECLARE EDITING IN TEXT AREA VARIABLES */
  isDbClick=false;
  nameConverted=false;
  titleConverted=false;
  //@ViewChild('descTextArea') myTextArea:ElementRef;
  
  /* HEADER CONFIGURATION */
  fontHeaderColor="#fff";
  
  /* DECLARE ALL THE VARIABLES OF THE Template1Component */
   
     cardStartIndex:any;
  /* CARD TEMPLATES */    
  //  @ViewChild('cardContainer') cards: any;
  
  @ViewChildren('cardTemplates') cardTemplates:any;
  @ViewChild('titleText') titleText:ElementRef;
  @ViewChild('designation') designation:ElementRef;
  
  
  cardsList:CardConfig[];
  cardToTemplateMaping: { [type: number]: Type<ViewChild> } = {};
  dragStart=false;
  /* CONTACT INFO TABLE */
  
  getCardTemplate(cardId: number ) {
          if(!this.dragStart){
           //   console.log('Template to fetch for '+cardId);
             // console.log(this.cardToTemplateMaping[cardId ]);
       
   if(this.cardToTemplateMaping&& this.cardToTemplateMaping[cardId ]){
  
       return this.cardToTemplateMaping[cardId ];
   } else {
       return null;
   }
          }
  }
  ngAfterViewInit(){
   
   this.cardTemplates.toArray().forEach((el,index) => {
       this.cardToTemplateMaping[index] = el;
     });
  
  
  }
  
  
  ngOnInit(){
    
    this.cardsList= this.service.getCardsListByTemplate('template5');
    this.pageSettings=this.service.getSavedPageSettings();
    if(this.pageSettings===undefined){
      
       this.pageSettings={};
     }
  }
  /* FROM THE TEMPLATE HANDLE EACH SECTION SETTING */   
  constructor(public dialog: MatDialog,private changeDetector: ChangeDetectorRef,private service:TemplateService,public templateSettings:TemplateSettingService) {
    this.subscription = this.templateSettings.getSettingsSubscriber().subscribe(pageSettings => { this.pageSettings = pageSettings; 
      
        
        });
  }
  
   openDialog(cardDetails:CardConfig): void {
       let dialogRef = this.dialog.open(SectionEditDialog, {
         width: '800px',
         data:cardDetails,
       });
   
       dialogRef.afterClosed().subscribe(result => {
  
      
       });
     }
     ngAfterViewChecked(){
      this.changeDetector.detectChanges();
     }
  /* READING IMAGE URL FOR PICTURE */
  readUrl(event:any) {
       if (event.target.files && event.target.files[0]) {
         var reader = new FileReader();
     
         reader.onload = (event:any) => {
           this.url = event.target.result;
         }
     
         reader.readAsDataURL(event.target.files[0]);
       }
     }
     /* HANDLE DRAG AND DROP */
     onCardDrag(event:any,cardIndex:string){
      
  
    
  
    }
    onDragEnd(event:any,cardIndex:string){
  
     
       this.cardStartIndex=event;
    }
    
      onCardDrop(e: any,cardDetails:CardConfig) {
      this. dragStart=false;
       
        
       let dragCardIndex = this.cardStartIndex;
       let dropCardIndex = cardDetails.index;
       
       if(dragCardIndex===dropCardIndex){
           return;
       }
   
       let tempCard = this.cardsList[dropCardIndex];
       let dragCard= this.cardsList[dragCardIndex];
  
       
        let dropCardId=tempCard.cardId;
        let dragCardId=dragCard.cardId;
      
        
  
  
     
         tempCard.index = dragCardIndex;
         dragCard.index = dropCardIndex;
       
          
         this.cardsList[dropCardIndex]=dragCard;
         
         this.cardsList[dragCardIndex]= tempCard;
  
  
         let tempTemplate=this.cardToTemplateMaping[dropCardIndex];
         this.cardToTemplateMaping[dropCardIndex]= this.cardToTemplateMaping[dragCardIndex];
         this.cardToTemplateMaping[dragCardIndex]=tempTemplate;
  
         tempCard.cardId = dragCardId;
         dragCard.cardId = dropCardId;
   
        this.dragStart=false;
      }
    
      
  /* HANDLING SECTION HOVER */
  onHoverSection(event:any, config:CardConfig){
  config.showConfig=event;
  
  }
  /* HANDLE THE CARD EDIT CLICK */
  onCardEdit(event:any,cardDetails:CardConfig){
  this.openDialog(cardDetails);
  }
  
  toggleNameEdit(){
    
      
      if(this.isNameEdit) {
        this.isNameEdit=false;
       var nicInstance = nicEditors.findEditor(this.titleText.nativeElement).getContent();
       this.userName=nicInstance;
       this.isDbClick=false;
       }else {
        // this.converted=true;
        this.isDbClick=true;
        this.isNameEdit=true;
         this.nameConverted=false;
       }
     }
  
  
     toggleDesigEdit(){
        
          
          if(this.isTitleEdit) {
            this.isTitleEdit=false;
           var nicInstance = nicEditors.findEditor(this.designation.nativeElement).getContent();
           this.title=nicInstance;
           this.isDbClick=false;
           }else {
            // this.converted=true;
            this.isDbClick=true;
            this.isTitleEdit=true;
             this.titleConverted=false;
           }
         }
  
         ngDoCheck(){
          if( this.cardTemplates && this.isSecModified ){
            this.cardTemplates.toArray().forEach((el,index) => {
              this.cardToTemplateMaping[index] = el;
            
            
         
            });
            this.isSecModified=false;
          }    
                if(this.titleText  && !this.nameConverted ){
          
                  nicEditors.convertTextArea(this.titleText.nativeElement);
               
                  this.nameConverted=true;
                 } 
                 if( this.designation && !this.titleConverted ){
              
                
                    nicEditors.convertTextArea(this.designation.nativeElement);
                    this.titleConverted=true;
                   } 
  
               }

               addNewSection(section:Section,component:ComponentType){
                
                              let newCard:CardConfig ={
                
                                title:section.name,
                                cardClass: 'col-md-6', 
                                isCardNavigationEnabled: true, 
                                isDraggable: true,
                                 isDroppable: true, 
                                 cardId: ""+this.cardsList.length, 
                                 index:""+(this.cardsList.length), 
                                 isEnlarge: false, 
                                 type:component,
                                cardPlacing: 'right'
                              };
                this.cardsList.push(newCard);
                this.isSecModified=true;
                this.changeDetector.detectChanges();  
                
                            }
                
                            getThemeName():string{
                             return this.themeName;
                            }

                            geTemplateContent():any{
                              var templateContent ={
                                sectionContent:this.cardsList,
                                pageSettings:{}
                              }
                              return templateContent;
                            }
                            onUserPhotoHover(event:any){
                              this.photoHover=event;
                              
                            }
                            onPhotoHide(){
                              this.showPhoto=false;
                            }
                            ngOnDestroy() {
                              // unsubscribe to ensure no memory leaks
                              this.subscription.unsubscribe();
                          }
}
