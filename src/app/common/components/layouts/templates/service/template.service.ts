import { ProgressSpinnerService } from './../../../../../progress-spinner/progress-spinner.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Tile } from './../../../../../templates/user-template/saved-template/Tile';
import { DescriptionComponent } from './../../../description/description.component';
import { PageSettings } from './../PageSettings';
import { Section } from './../../../../../templates/side-nav-content/Section';
import { ComponentType } from './../../../ComponentType';
import { ChipItem } from './../../../chip/ChipIem';
import { ProfileDescription } from './../../../description/ProfileDescription';
import { TimeLineData } from './../../../model/TimeLineData';
import { Skill } from './../../../skill';
import { ContactType } from './../../../contact-info/ContactType';
import { CardConfig } from './../../CardConfig';
import { Injectable, Type } from '@angular/core';
import * as firebase from 'firebase/app';
import * as firebaseStorage from 'firebase/storage';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { UIType } from '../../../contact-info/UIType';
import { UserDetailsService } from '../../../../../user-details-service';
import { TemplateSettingService } from '../template-setting-service';
@Injectable()
export class TemplateService {

  subscription: Subscription;

  


  cardToTemplateMaping: { [themeName: string]: CardConfig[] } = {  };
  pageSettings:PageSettings={};




  /* CARD MAPPING FROM ID TO TEMPLATE */

  /* CONTACT INFO TABLE */
  contactTypes: ContactType[] = [{ 'contactType': 'Name', 'icon': 'person', 'value': 'Raghavendra Bhatt','typeOfUI':UIType.TEXT },
  { 'contactType': 'Address', 'icon': 'map', 'value': '7632 Halsey St,Apt 204 Lenexa KS 66216' ,'typeOfUI':UIType.TEXT_AREA}, { 'contactType': 'Phone', 'icon': 'phone', 'value': '+19134060640','typeOfUI':UIType.TEXT }, { 'contactType': 'Email', 'icon': 'email', 'value': 'raghavendra.pes@gmail.com' ,'typeOfUI':UIType.TEXT}];

  /* SKILLS */
  skills: Skill[] = [{ name: 'test1', value: 10, 'isEdit': false, 'isDelete': false }, { name: 'test2', value: 5, 'isEdit': false, 'isDelete': false }, { name: 'test3', value: 7, 'isEdit': false, 'isDelete': false }];

  /* TIME LINE DATA */
  timeLineDataSet: TimeLineData[] = [{ 'title': 'First Employment/Education/anytimeline info Details', 'startTime': '2016-Nov-15', 'endTime': '2016-Nov-15', 'desc': 'This is a detailed description . To edit information use the edit icon.', 'isEdit': false, 'isDelete': false, 'showActions': false }, { 'title': 'Add your employment description by doubleclicking on the content. To edit complete information use the edit icon.', 'startTime': '2016-Nov-15', 'endTime': '2016-Nov-15', 'desc': 'This is the testing of teh time line module', 'isEdit': false, 'isDelete': false, 'showActions': false }, { 'title': 'Third Employment Details', 'startTime': '2016-Nov-15', 'endTime': '2016-Nov-15', 'desc': 'Add your employment description by doubleclicking on the content. To edit complete information use the edit icon.', 'isEdit': false, 'isDelete': false, 'showActions': false }];
  /* SKILL CHART DATA */
  skillCharts: Skill[] = [{ name: 'test1', value: 90, 'isEdit': false, 'isDelete': false }, { name: 'test2', value: 95, 'isEdit': false, 'isDelete': false }, { name: 'test3', value: 87, 'isEdit': false, 'isDelete': false }];

  /* DESCRIPTION DATA */
  content: ProfileDescription = { description: "Add your objective here !" }

  /* SKILLS AS CHIPS */
  skillsAsChips: ChipItem[] = [{ 'itemName': 'My chip 1' }, { 'itemName': 'My chip 2' }, { 'itemName': 'My chip 3' }, { 'itemName': 'My chip 4' }, { 'itemName': 'My chip 5' }, { 'itemName': 'My chip 6' }]
  userDetailsSubscription: Subscription;
  
  private userDetails: firebase.User = null;
  constructor(private userDetailService:UserDetailsService,private templateSettings:TemplateSettingService, public afDb: AngularFireDatabase,private spinnerService:ProgressSpinnerService) { 
    this.userDetailsSubscription = this.userDetailService.userDetailsSubscriber().subscribe(userDetails => {
      this.userDetails = userDetails;
     

      }); 

      this.subscription = this.templateSettings.getSettingsSubscriber().subscribe(pageSettings => { this.pageSettings = pageSettings; 
        console.log("in base component ::"+this.pageSettings.isPreviewMode);

     
         
         });


     this.userDetails= this.userDetailService.getUserDetails();

  }

  getSkillsForChart(): Skill[] {
    let skills: Skill[] = [{ name: 'Skill 1 %', value: 80, 'isEdit': false, 'isDelete': false }, { name: 'Skill 2 %', value: 75, 'isEdit': false, 'isDelete': false }, { name: 'Skill 3 %', value: 90, 'isEdit': false, 'isDelete': false }];
    return skills;

  }
  getTimeLineData(): TimeLineData[] {
    let imeLineDataSet: TimeLineData[] = [{ 'title': 'First Employment/Education/anytimeline info Details', 'startTime': '2016-Nov-15', 'endTime': '2016-Nov-15', 'desc': 'This is a detailed description . To edit or add new entry use the icons at the right side.', 'isEdit': false, 'isDelete': false, 'showActions': false }, { 'title': 'Second Employment/Education/anytimeline info Details', 'startTime': '2016-Nov-15', 'endTime': '2016-Nov-15', 'desc': 'This is a detailed description . To edit or add new entry use the icons at the right side', 'isEdit': false, 'isDelete': false, 'showActions': false }];
    return imeLineDataSet;

  }
  getSkills(): Skill[] {
    let skills: Skill[] = [{ name: 'Skill-1(range from 1-10)', value: 10, 'isEdit': false, 'isDelete': false }, { name: 'Skill-2(range from 1-10)', value: 5, 'isEdit': false, 'isDelete': false }, { name: 'Skill-3(range from 1-10)', value: 7, 'isEdit': false, 'isDelete': false }];
    return skills;
  }
  getDescContent(): ProfileDescription {
    let content: ProfileDescription = { description: "Add  description here ! Use Edit icon to edit the section" }
    return content;
  }
  getContactTypes(): ContactType[] {
    let contactTypes: ContactType[] = [
    { 'contactType': 'Phone', 'icon': 'phone', 'value': '+1-111-111111' ,'typeOfUI':UIType.TEXT}, { 'contactType': 'Email', 'icon': 'email', 'value': 'email@email.com' ,'typeOfUI':UIType.TEXT}];
    return contactTypes;
  }
  getHeaderContactTypes(): ContactType[] {
    let contactTypes: ContactType[] = [
      { 'contactType': 'Address', 'icon': 'map', 'value': 'Address' ,'typeOfUI':UIType.TEXT_AREA}, { 'contactType': 'Phone', 'icon': 'phone', 'value': '+1-111-111111','typeOfUI':UIType.TEXT }, { 'contactType': 'Email', 'icon': 'email', 'value': 'youremail@email.com','typeOfUI':UIType.TEXT }];
    return contactTypes;
  }

  getChips(): ChipItem[] {
    let skillsAsChips: ChipItem[] = [{ 'itemName': 'Skill-1/Award-1/hobby-1' }, { 'itemName': 'Skill-2/Award-2/hobby-2' }, { 'itemName': 'Skill-3/Award-3/hobby-3' }, { 'itemName': 'Skill-4/Award-4/hobby-4' }]
    return skillsAsChips;
  }
  getStarSkills(): Skill[] {
    let skills: Skill[] = [{ name: 'Skill 1 %', value: 4, 'isEdit': false, 'isDelete': false }, { name: 'Skill 2 %', value: 3, 'isEdit': false, 'isDelete': false }, { name: 'Skill 3 %', value: 2, 'isEdit': false, 'isDelete': false }];
    return skills;
  }
  getCardsListByTemplate(templateName: string): CardConfig[] {
    return this.cardToTemplateMaping[templateName];
  }

  getAvailableSections(): Section[] {
    let sections: Section[] = [
      {
        name: 'Objective',
        component: [{
          name: 'Text Description',
          type: ComponentType.DESCRIPTION
        }]
      },
      {
        name: 'Summary',
        component: [{
          name: 'Text Description',
          type: ComponentType.DESCRIPTION
        }]
      },
      {
        name: 'Professional Experience',
        component: [{
          name: 'Simple Timeline',
          type: ComponentType.SIMPLE_TIMELINE
        },
        {
          name: 'Timeline with step numbers',
          type: ComponentType.TIMELINE_STEPPER
        },
        {
          name: 'Vertical Timeline',
          type: ComponentType.TIMELINE_STEPPER
        },
       /* {
          name: 'Vertical Timeline enhanced',
          type: ComponentType.VERTICAL_TIMELINE
        } */
        ]
      },

      {
        name: 'Education',
        component: [{
          name: 'Simple Timeline',
          type: ComponentType.SIMPLE_TIMELINE
        },
        {
          name: 'Timeline with step numbers',
          type: ComponentType.TIMELINE_STEPPER
        },
        {
          name: 'Vertical Timeline',
          type: ComponentType.LINEAR_TIMELINE
        }
        ]
      },


      {
        name: 'Personal Skills',
        component: [
          {
            name: 'Text Description',
            type: ComponentType.DESCRIPTION
          },
          {
          name: 'Progress bar',
          type: ComponentType.SKILL_PROGRESS
        },
        {
          name: 'Progress bar -  donut',
          type: ComponentType.SKILL_CHART
        },
        {
          name: 'Progress bar - stars',
          type: ComponentType.STAR_SKILL
        },
        {
          name: 'Progress bar - circle',
          type: ComponentType.CIRCLE_SKILL
        }
        ]
      },
      {
        name: 'Technical Skills',
        component: [
          {
            name: 'Text Description',
            type: ComponentType.DESCRIPTION
          },{
          name: 'Progress bar',
          type: ComponentType.SKILL_PROGRESS
        },
        {
          name: 'Progress bar - donut',
          type: ComponentType.SKILL_CHART
        },
        {
          name: 'Progress bar - stars',
          type: ComponentType.STAR_SKILL
        },
        {
          name: 'Progress bar - circle',
          type: ComponentType.CIRCLE_SKILL
        }
        ]
      },


      {
        name: 'Software',
        component: [
          {
            name: 'Text Description',
            type: ComponentType.DESCRIPTION
          },{
          name: 'Progress bar',
          type: ComponentType.SKILL_PROGRESS
        },
        {
          name: 'Progress bar -  donut',
          type: ComponentType.SKILL_CHART
        },
        {
          name: 'Progress bar - stars',
          type: ComponentType.STAR_SKILL
        },
        {
          name: 'Progress bar - circle',
          type: ComponentType.CIRCLE_SKILL
        }
        ]
      },

      {
        name: 'Certificates',
        component: [{
          name: 'Chips',
          type: ComponentType.SKILL_CHIPS
        },
        {
          name: 'Text Description',
          type: ComponentType.DESCRIPTION
        }
        ]
      },
      {
        name: 'Courses',
        component: [{
          name: 'Chips',
          type: ComponentType.SKILL_CHIPS
        },
        {
          name: 'Text Description',
          type: ComponentType.DESCRIPTION
        }
        ]
      },
      {
        name: 'Publications',
        component: [
          {
            name: 'Text Description',
            type: ComponentType.DESCRIPTION
          }
        ]
      },
      {
        name: 'Awards',
        component: [{
          name: 'Chips',
          type: ComponentType.SKILL_CHIPS
        },
        {
          name: 'Text Description',
          type: ComponentType.DESCRIPTION
        }
        ]
      },
      {
        name: 'Research',
        component: [
          {
            name: 'Text Description',
            type: ComponentType.DESCRIPTION
          }
        ]
      },
      {
        name: 'Conference',
        component: [
          {
            name: 'Text Description',
            type: ComponentType.DESCRIPTION
          }
        ]
      },
      {
        name: 'Languages',
        component: [
          {
            name: 'Chips',
            type: ComponentType.SKILL_CHIPS
          },
          {
            name: 'Text Description',
            type: ComponentType.DESCRIPTION
          },
        ]
      },
      {
        name: 'Hobby',
        component: [{
          name: 'Chips',
          type: ComponentType.SKILL_CHIPS
        },
        {
          name: 'Text Description',
          type: ComponentType.DESCRIPTION
        }
        ]
      },
    ];
    return sections;
  }

  saveUserTheme(){
   this.userDetails.getIdToken().then(function(token:any){
  console.log(token);
   });
  }



  /* UPDATE CARDS FOR THE TEMPLATE WITH USER SAVED INFO */
  /*
  updateTemplateData(snapshotData:any){
    this.cardToTemplateMaping[snapshotData.theme]=snapshotData.data.sectionContent;
    if(snapshotData.pageSettings){
    this.pageSettings=snapshotData.pageSettings;
    }
    
  }
  */
  getSavedPageSettings(){
    return this.pageSettings;
  }

  resetCardData(){
    /* CARD 1 TEMPLATE */

  let CARD_DETAILS1: CardConfig = { title: 'Objective', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '123', index: '0', isEnlarge: false, type: ComponentType.DESCRIPTION, cardPlacing: 'right' };
  let CARD_DETAILS2: CardConfig = { title: 'Professional Experience', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '345', index: '1', isEnlarge: false, type: ComponentType.TIMELINE_STEPPER, cardPlacing: 'right' };
  let CARD_DETAILS3: CardConfig = { title: 'Technical Skills', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '456', index: '2', isEnlarge: false, type: ComponentType.SKILL_PROGRESS, cardPlacing: 'right' };
  let CARD_DETAILS4: CardConfig = { title: 'Education', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '567', index: '3', isEnlarge: false, type: ComponentType.LINEAR_TIMELINE, cardPlacing: 'right' };
  let CARD_DETAILS5: CardConfig = { title: 'Certificates', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '789', index: '4', isEnlarge: false, type: ComponentType.SKILL_CHIPS, cardPlacing: 'right' };

  /* CARD MAPPING FROM ID TO TEMPLATE */
  let cardsList1: any = [CARD_DETAILS1, CARD_DETAILS2, CARD_DETAILS3, CARD_DETAILS4, CARD_DETAILS5];

  /* CARD 2 TEMPLATE */

  let CARD_DETAILS_T2_1: CardConfig = { title: 'Professional Summary', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '1', index: '0', isEnlarge: false, icon: 'ion-ios-compose', type: ComponentType.DESCRIPTION, cardPlacing: 'right' };
  let CARD_DETAILS_T2_9: CardConfig = { title: 'Work Experience', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '2', index: '1', isEnlarge: false, icon: 'ion-medkit', type: ComponentType.TIMELINE_STEPPER, cardPlacing: 'right' };

  let CARD_DETAILS_T2_2: CardConfig = { title: 'Personal Details', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '2', index: '1', isEnlarge: false, icon: 'ion-ionic', type: ComponentType.CONTACT_INFO, cardPlacing: 'left' };
  let CARD_DETAILS_T2_3: CardConfig = { title: 'Technical Skills', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '3', index: '2', isEnlarge: false, icon: 'ion-medkit', type: ComponentType.SKILL_CHART, cardPlacing: 'right' };
  let CARD_DETAILS_T2_4: CardConfig = { title: 'Professional Skills', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '4', index: '3', isEnlarge: false, icon: 'ion-ios-color-wand', type: ComponentType.SKILL_PROGRESS, cardPlacing: 'right' };
  let CARD_DETAILS_T2_5: CardConfig = { title: 'Personal Skills', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '5', index: '4', isEnlarge: false, icon: 'ion-ios-paper', type: ComponentType.SKILL_CHART, cardPlacing: 'right' };
  let CARD_DETAILS_T2_6: CardConfig = { title: 'Education', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '6', index: '5', isEnlarge: false, icon: 'ion-ios-book', type: ComponentType.TIMELINE_STEPPER, cardPlacing: 'right' };

  let CARD_DETAILS_T2_7: CardConfig = { title: 'Contact', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '7', index: '6', isEnlarge: false, icon: 'ion-pull-request', type: ComponentType.CONTACT_INFO, cardPlacing: 'left' };
  let CARD_DETAILS_T2_8: CardConfig = { title: 'References', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '8', index: '6', isEnlarge: false, icon: 'ion-social-designernews-outline', type: ComponentType.CONTACT_INFO, cardPlacing: 'left' };



  /* CARD MAPPING FROM ID TO TEMPLATE */
  let cardsList_T2: any = [CARD_DETAILS_T2_1, CARD_DETAILS_T2_9, CARD_DETAILS_T2_2, CARD_DETAILS_T2_3, CARD_DETAILS_T2_4, CARD_DETAILS_T2_6, CARD_DETAILS_T2_7, CARD_DETAILS_T2_8, CARD_DETAILS_T2_5];

  /* CARD 3 TEMPLATE MAPPING */

  let CARD_DETAILS_T3_1: CardConfig = { title: 'Objective', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '123', index: '0', isEnlarge: false, type: ComponentType.DESCRIPTION, cardPlacing: 'right' };
  let CARD_DETAILS_T3_6: CardConfig = { title: 'Personal Details', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '2', index: '1', isEnlarge: false, icon: 'ion-ionic', type: ComponentType.CONTACT_INFO, cardPlacing: 'left' };

  let CARD_DETAILS_T3_2: CardConfig = { title: 'Professional Experience', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '345', index: '2', isEnlarge: false, type: ComponentType.TIMELINE_STEPPER, cardPlacing: 'right' };
  let CARD_DETAILS_T3_3: CardConfig = { title: 'Technical Skills', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '456', index: '3', isEnlarge: false, type: ComponentType.SKILL_PROGRESS, cardPlacing: 'left' };
  let CARD_DETAILS_T3_4: CardConfig = { title: 'Education', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '567', index: '4', isEnlarge: false, type: ComponentType.SIMPLE_TIMELINE, cardPlacing: 'right' };
  let CARD_DETAILS_T3_5: CardConfig = { title: 'Certificates', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '789', index: '5', isEnlarge: false, type: ComponentType.SKILL_CHIPS, cardPlacing: 'right' };
  let cardsList_T3: any = [CARD_DETAILS_T3_1, CARD_DETAILS_T3_6, CARD_DETAILS_T3_2, CARD_DETAILS_T3_3, CARD_DETAILS_T3_4, CARD_DETAILS_T3_5];


  /* TEMPLATE 4 CARDS MAPPING */

  let CARD_DETAILS_T4_1: CardConfig = { title: 'Objective', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '123', index: '0', isEnlarge: false, type: ComponentType.DESCRIPTION, cardPlacing: 'right' };
  let CARD_DETAILS_T4_2: CardConfig = { title: 'Professional Experience', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '345', index: '1', isEnlarge: false, type: ComponentType.TIMELINE_STEPPER, cardPlacing: 'right' };
  let CARD_DETAILS_T4_3: CardConfig = { title: 'Technical Skills', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '456', index: '2', isEnlarge: false, type: ComponentType.SKILL_PROGRESS, cardPlacing: 'right' };
  let CARD_DETAILS_T4_4: CardConfig = { title: 'Education', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '567', index: '3', isEnlarge: false, type: ComponentType.SIMPLE_TIMELINE, cardPlacing: 'right' };
  let CARD_DETAILS_T4_5: CardConfig = { title: 'Certificates', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '789', index: '4', isEnlarge: false, type: ComponentType.SKILL_CHIPS, cardPlacing: 'right' };

  /* CARD MAPPING FROM ID TO TEMPLATE */
  let cardsList_T4: any = [CARD_DETAILS_T4_1, CARD_DETAILS_T4_2, CARD_DETAILS_T4_3, CARD_DETAILS_T4_4, CARD_DETAILS_T4_5];

  /* TEMPLATE 5 CARDS MAPPING */

  let CARD_DETAILS_T5_1: CardConfig = { title: 'Objective', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '123', index: '0', isEnlarge: false, type: ComponentType.DESCRIPTION, cardPlacing: 'right' };
  let CARD_DETAILS_T5_2: CardConfig = { title: 'Professional Experience', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '345', index: '1', isEnlarge: false, type: ComponentType.TIMELINE_STEPPER, cardPlacing: 'right' };
  let CARD_DETAILS_T5_3: CardConfig = { title: 'Technical Skills', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '456', index: '2', isEnlarge: false, type: ComponentType.SKILL_PROGRESS, cardPlacing: 'right' };
  let CARD_DETAILS_T5_4: CardConfig = { title: 'Education', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '567', index: '3', isEnlarge: false, type: ComponentType.SIMPLE_TIMELINE, cardPlacing: 'right' };
  let CARD_DETAILS_T5_5: CardConfig = { title: 'Certificates', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '789', index: '4', isEnlarge: false, type: ComponentType.SKILL_CHIPS, cardPlacing: 'right' };

  /* CARD MAPPING FROM ID TO TEMPLATE */
  let cardsList_T5: any = [CARD_DETAILS_T5_1, CARD_DETAILS_T5_2, CARD_DETAILS_T5_3, CARD_DETAILS_T5_4, CARD_DETAILS_T5_5];
  /* CARD MAPPING FROM ID TO TEMPLATE */

  let CARD_DETAILS_T6_1: CardConfig = { title: 'Objective', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '123', index: '0', isEnlarge: false, type: ComponentType.DESCRIPTION, cardPlacing: 'right' };
  let CARD_DETAILS_T6_2: CardConfig = { title: 'Professional Experience', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '345', index: '1', isEnlarge: false, type: ComponentType.TIMELINE_STEPPER, cardPlacing: 'right' };
  let CARD_DETAILS_T6_3: CardConfig = { title: 'Technical Skills', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '456', index: '2', isEnlarge: false, type: ComponentType.SKILL_PROGRESS, cardPlacing: 'right' };
  let CARD_DETAILS_T6_4: CardConfig = { title: 'Education', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '567', index: '3', isEnlarge: false, type: ComponentType.SIMPLE_TIMELINE, cardPlacing: 'right' };
  let CARD_DETAILS_T6_5: CardConfig = { title: 'Certificates', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '789', index: '4', isEnlarge: false, type: ComponentType.SKILL_CHIPS, cardPlacing: 'right' };

  let cardsList_T6: any = [CARD_DETAILS_T6_1, CARD_DETAILS_T6_2, CARD_DETAILS_T6_3, CARD_DETAILS_T6_4, CARD_DETAILS_T6_5];

  this.cardToTemplateMaping = { 'template1': cardsList1, 'template2': cardsList_T2, 'template3': cardsList_T3, 'template4': cardsList_T4, 'template5': cardsList_T5,'template6': cardsList_T6 };
 
  this.pageSettings={};
  }

  fetchUserContent(template:string){
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/userContent/' + userId+'/'+template).once('value')
  }
  fetchSharedResume(id:string,title:string,random:string){
    let url='/userContent/'+id+'/'+random;
    console.log(url);
    return firebase.database().ref('/userContent/'+id+'/'+random).once('value');
    
  }
  fetchUserSavedTemplates(){
    /* firebase.database().ref('/userContent/ZAfbtKEiaKQmsXEGupxq4PML0xn2/Again Same name').equalTo('ABCXXX').once('value').then((snapshot) => {
      var snapshotData = snapshot.val();
      
      console.log(snapshotData);
     
        });

       firebase.database().ref('/userContent/ZAfbtKEiaKQmsXEGupxq4PML0xn2/Raghav second resume').equalTo('ABCXXX').once('value').then((snapshot) => {
          var snapshotData = snapshot.val();
          
          console.log('Fetfched second data');
          console.log(snapshotData);
         
            });

  */

    // this.tiles=snapshotData;

  

  

    var userId = firebase.auth().currentUser.uid;
  

    return firebase.database().ref('/userTemplate/' + userId).once('value')
  }
deleteResume(tile:Tile,tiles:Tile[]){
  var userId = firebase.auth().currentUser.uid;
  let fbref= firebase.database().ref('/userContent/'+userId+"/"+tile.UID);
  let tmlateRef= firebase.database().ref('/userTemplate/'+userId+"/"+tile.tileID);
  /* DELETE THUMBNAIL AND PROFILE PIC */
  const storageRef = firebase.storage().ref();
  let resumeProfilePath = '/userContent/'+userId+"/"+tile.UID + '.jpg';
  var profilePicRef = storageRef.child(resumeProfilePath);

  let templateThumbnail = '/userTemplate/'+userId+"/"+tile.UID + '.png';
  var thumbNailRef = storageRef.child(templateThumbnail);
  fbref.remove((error)=> {
   
    tmlateRef.remove((error)=> {
      this.getProgressSpinnerService().endProgressBar();
      thumbNailRef.delete().then(function (snapshot) {
        // console.log('Uploaded a data_url string!');
     
        profilePicRef.delete().then(function (snapshot) {
         // console.log('Uploaded a data_url string!');
      
      
      
           
          }).catch(function (error) {
           console.log(error);
          });
     
          
         }).catch(function (error) {
          console.log(error);
         });
 
         
      var index = tiles.indexOf(tile, 0);
      if (index > -1) {
        tiles.splice(index, 1);

      }
    });

  });




 
  

    

  

 
}

fetchCurrentTemplate(tile:Tile){


  console.log(tile);

    var userId = firebase.auth().currentUser.uid;
  

    return firebase.database().ref('/userContent/' + userId+'/'+tile.UID).once('value');
  

}
updateUserTemplate(tile:Tile,snapshotData){
  
  

  var userId = firebase.auth().currentUser.uid;
  var updates={};
  updates['/userContent/' + userId+'/'+tile.UID] = snapshotData;
  return firebase.database().ref().update(updates);

  
  
}
fetchUserProfilePicture(UID:string){
  const storageRef = firebase.storage().ref();
  let resumeProfilePath = '/userContent/' + this.userDetails.uid + '/' + UID + '.jpg';

   return storageRef.child(resumeProfilePath).getDownloadURL();
  
}
fetchSharedProfilePicture(id:string,UID:string){
  const storageRef = firebase.storage().ref();
  let resumeProfilePath = '/userContent/' + id+ '/' + UID + '.jpg';

   return storageRef.child(resumeProfilePath).getDownloadURL();
  
}
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.userDetailsSubscription.unsubscribe();
   
}
getProgressSpinnerService(){
  return this.spinnerService
}

saveUserProfilePic(url:string){
  const storageRef = firebase.storage().ref();

  let resumeProfilePath = '/userProfile/' + this.userDetails.uid+ '/'+this.userDetails.displayName + '.jpg';
  console.log('Resume Path :'+resumeProfilePath);
  var mountainImagesRef = storageRef.child(resumeProfilePath);
  return mountainImagesRef.putString(url, 'data_url');

   

}
fetchUserProfilePic(){
  const storageRef = firebase.storage().ref();
  let resumeProfilePath = '/userProfile/' + this.userDetails.uid+ '/'+this.userDetails.displayName + '.jpg';

   return storageRef.child(resumeProfilePath).getDownloadURL();

}
}