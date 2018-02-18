import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

import { LoginComponent } from './login/login.component';
import { UserTemplateModule } from './templates/user-template/user-template-module';
import { UserDetailsService } from './user-details-service';


import { AuthService } from './providers/auth.service.ts.service';

import { TemplatesModule } from './templates/templates.module';
import { HomeComponent } from './home/home.component';
import { Template5Component } from './common/components/layouts/templates/template5/template5.component';
import { Template4Component } from './common/components/layouts/templates/template4/template4.component';
import { TemplateChooserComponent } from './template-chooser/template-chooser.component';
import { TemplateService } from './common/components/layouts/templates/service/template.service';
import { Template3Component } from './common/components/layouts/templates/template3/template3.component';
import { Template2Component } from './common/components/layouts/templates/template2/template2.component';
import { Template1Component } from './common/components/layouts/templates/template1/template1.component';
import { SectionEditDialog } from './common/components/section-edit/section-edit.dialog';
import { FontColorChooserDialog } from './common/components/font-color-chooser/chooser.dialog';
import { CommonSharedModule } from './common/common.shared.module';


import { MaterialModule } from './material/material.module';
import { GestureConfig } from '@angular/material';
import { ResumeTemplateModule } from './resume-template/resume-template.module';
import { BrowserModule ,HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { ResumeContentSelectorModule } from './common/components/resume-content-selector/resume-content-selector.module';
import { NgxImageGalleryModule } from 'ngx-image-gallery';

//ANGULAR MATERIAL 

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ConfirmDialog } from './templates/confirm-dialog';
import { LoginDialog } from './login/login-dialog';
import { ProgressSpinnerService } from './progress-spinner/progress-spinner.service';
import { BaseComponentComponent } from './common/components/base-component/base-component.component';
import { BaseTemplateComponent } from './common/components/layouts/templates/base-template/base-template.component';
import { BaseRatingComponent } from './common/components/base-rating/base-rating.component';
import { BaseTimelineComponent } from './common/components/base-timeline/base-timeline.component';
import { BaseSkillComponent } from './common/components/base-skill/base-skill.component';

// MATERIAL MODULE DECLARED
//CARSOUSAL MODULE

export const firebaseConfig = {
 

  apiKey: "AIzaSyAkgV9y_MuZ3RyyhGU1khuXktUhxtIntHM",
  authDomain: "cresumeker.firebaseapp.com",
  databaseURL: "https://cresumeker.firebaseio.com",
  projectId: "cresumeker",
  storageBucket: "gs://cresumeker.appspot.com",
  messagingSenderId: "1015623460345"

};
const routes: Routes = [
   
    
  { path: '',redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  
  { path: 'themes', component: TemplateChooserComponent },
  
 ];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProgressSpinnerComponent,
    
    
    
    LoginComponent,
    LoginDialog,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
TemplatesModule,
UserTemplateModule,
NgxImageGalleryModule,
AngularFireModule.initializeApp(firebaseConfig),
AngularFireDatabaseModule,
AngularFireAuthModule,
    RouterModule.forRoot(routes, {useHash: true}),
   
    /* ALL CUSTOM MODULES ADDED */
    ResumeTemplateModule,
   
   
    
    ResumeContentSelectorModule,
    CommonSharedModule
    
   
  ],

  providers: [UserDetailsService,ProgressSpinnerService,AuthService,{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }],
entryComponents:[LoginComponent,LoginDialog],
  bootstrap: [AppComponent]
  
})
export class AppModule {

  
 }
/*
 @NgModule({ declarations: [BaseComponentComponent,BaseSkillComponent, SectionEditDialog,FontColorChooserDialog, BaseTemplateComponent,BaseRatingComponent,BaseTimelineComponent] })
 export class IgnoreModule {}
*/