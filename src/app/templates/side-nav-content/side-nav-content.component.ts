import { SectionComponent } from './Component';

import { CardConfig } from './../../common/components/layouts/CardConfig';
import { materialColors } from './../../common/material-color-config';
import { TemplateSettingService } from './../../common/components/layouts/templates/template-setting-service';
import { ComponentType } from './../../common/components/ComponentType';
import { Section } from './Section';
import { TemplateService } from './../../common/components/layouts/templates/service/template.service';
import { Component ,Output,EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ISlimScrollOptions } from 'ng2-slimscroll';
import { PageSettings } from '../../common/components/layouts/templates/PageSettings';
import {sequence, trigger, stagger, animate, style, group, query , transition, keyframes, animateChild} from '@angular/animations';


@Component({
    moduleId: module.id,
    selector: 'side-nav-content',
    animations: [
        
       
    
        trigger('listAnimation', [
          transition('* => *', [
    
            query(':enter', style({ opacity: 0 }), {optional: true}),
    
            query(':enter', stagger('200ms', [
              animate('300ms ease-in', keyframes([
                style({opacity: 0, transform: 'translateX(-75%)', offset: 0}),
               
              
                style({opacity: 1, transform: 'translateX(0)',     offset: 1.0}),
              ]))]), {optional: true}),
              query(':leave', stagger('200ms', [
                animate('300ms ease-out', keyframes([
                
                  style({opacity: .5, transform: 'translateX(75%)',  offset: 0}),
                
                  style({opacity: 0, transform: 'translateX(0)',     offset: 1.0}),
                ]))]), {optional: true})
    
          ])
        ])
        
          ],
    templateUrl: 'side-nav-content.component.html',
    styleUrls: ['side-nav-content.component.scss']
})
export class SideNavContentComponent {
    
    @Output() addOrRemoveSection = new EventEmitter<any>();
    @Output() onSideNavClose = new EventEmitter<any>();
    opts: ISlimScrollOptions;
    panelOpenState: boolean = false;
    templateSections:Section[];
    subscription: Subscription;
    sectionUpdateSub: Subscription;
    autoTicks = false;
    disabled = false;
    invert = false;
    clientHeight:string;
    scrollHeight:string;
    max = 40;
    min = 18;
    showTicks = false;
    step = 1;
    thumbLabel = true;
    value = 20;
    vertical = false;
    pageSettings:PageSettings={};
    materialColors:any[];
    fontFamilies:string[]=["Roboto","AmericanTypewriter","CourierNew","Courier","Monaco","mono","ArialRoundedMTBold","Helvetica","Arial","sans-serif","Baskerville","Georgia","Garamond","TimesNewRoman","Times","serif","BookAntiqua","Georgia","Garamond","TimesNewRoman","Times","serif","BookmanOldStyle","Georgia","Garamond","TimesNewRoman","Times","serif","BrushScriptMT","ComicSans","sans-serif","Chalkboard","ComicSans","sans-serif","Didot","Georgia","Garamond","TimesNewRoman","Times","serif","Futura","Impact","Helvetica","Arial","sans-serif","GillSans","LucidaGrande","LucidaSansUnicode","Verdana","Helvetica","Arial","sans-serif","HelveticaNeue","Helvetica","Arial","sans-serif","HoeflerText","Garamond","Georgia","TimesNewRoman","Times","serif","LucidaGrande","LucidaSansUnicode","Lucida","Verdana","Helvetica","Arial","sans-serif","MarkerFelt","ComicSanssans-serif","Myriad","Helvetica","Arial","sans-serif","Optima","LucidaGrande","LucidaSansUnicode","Verdana","Helvetica","Arial","sans-serif","Palatino","BookAntiqua","Georgia","Garamond","TimesNewRoman","Times","serif","Cochin","Georgia","Garamond","TimesNewRoman","Times","serif","GoudyOldStyle","garamond","bookantiqua","TimesNewRoman","Times","serifsequence"];
    
    reArrangeSections=false;
    

    constructor(private service:TemplateService,private settingsService:TemplateSettingService){
        this.subscription = this.settingsService.getSettingsSubscriber().subscribe(pageSettings => { this.pageSettings = pageSettings; 
            
              
              });

              this.sectionUpdateSub = this.settingsService.getsectionUpdatesSubscriber().subscribe(data => { 
                this.toggleSections(data);
              
             
             });

    }
    ngOnInit() {
        this.materialColors=materialColors;
        this.clientHeight=(window.screen.height-200) + "px";
        this.scrollHeight=(window.screen.height-210) + "px";
        this.templateSections=this.service.getAvailableSections();
        
        this.pageSettings=this.service.getSavedPageSettings();
        this.opts = {
            position: 'right',
            barBackground: '#ccc',
            barWidth:'8',
            barMargin:'0 2px'
         
          }
       
    }

    addSectionComponent(section:Section,component:SectionComponent,changeEvent:any){
        let componentType;
        section.isSelected=changeEvent.checked;
        console.log(component);
        if(component===undefined){
            componentType=section.component[0].type;
        }else {
            component.isSelected=changeEvent.checked;
            componentType=component.type;
           
        }
      
        let event={
            'section':section,
            'componentType':componentType,
            'isAddition':changeEvent.checked
        }
       
        this.addOrRemoveSection.emit(event);
    }
    addSection(section:Section,changeEvent:any){
       section.isSelected=changeEvent.checked;
           let component=section.component[0].type;
        
        let event={
            'section':section,
            'componentType':component,
            'isAddition':changeEvent.checked
        }
       
        this.addOrRemoveSection.emit(event);
    }
    showOrHideSectionComp(section:Section){
     section.showComponent=  section.showComponent?false:true;
    }
    closeSideNav(event:any){
        this.onSideNavClose.emit(event);
    }
    onHeaderFontChange(event:any){
        this.pageSettings.headerFontStyle=event.value;
        this.settingsService.updateTemplateSetting(this.pageSettings);
    }
    onContentFontChange(event:any){
        this.pageSettings.contentFontStyle=event.value;
        this.settingsService.updateTemplateSetting(this.pageSettings);
    }
    onHeaderFontSizeChange(event:any){
        this.pageSettings.headerFontSize=event.value;
        this.settingsService.updateTemplateSetting(this.pageSettings);
    }
    onContentFontSizeChange(event:any){
        this.pageSettings.contentFontSize=event.value;
        this.settingsService.updateTemplateSetting(this.pageSettings);
    }

    onColorSelect(material:any, variation:any){
        
        this.pageSettings.fontColor=variation.fontColor;
        this.pageSettings.colorTheme=variation.hex;
        this.pageSettings.cssClass=material.color+"-"+variation.weight;
        this.settingsService.updateTemplateSetting(this.pageSettings);
    }
    onSectionReArrange(event:any){
        this.reArrangeSections=event.checked;
        this.pageSettings.showContent=!event.checked;
       
        this.settingsService.updateTemplateSetting(this.pageSettings);
    }
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
        this.sectionUpdateSub.unsubscribe();
    }
    toggleSections(data:any){
        this.reArrangeSections=false;
     let cards:CardConfig[]=data;
    
    
        this.templateSections.forEach((section)=>{
            section.isSelected=false;
            section.component.forEach((comp) => {
                comp.isSelected=false;
            });
            cards.forEach((card) => {
           
            
                if(section.component.length>1){
                   
                    if (card.title ===section.name){
                    section.component.forEach((comp) => {
                        
                       
                       
                        if(card.type==comp.type){
                            section.isSelected=true;
                            comp.isSelected=true;

                        
                        }
                    });
                }
                }else   if (card.title ===section.name){
                    section.isSelected=true;
                }
                
    
               
        });
          
       });

    }
}
