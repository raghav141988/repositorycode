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

import { TimelineModule } from './common/components/timeline/timeline.module';
import { MaterialModule } from './material/material.module';
import { ResumeTemplateModule } from './resume-template/resume-template.module';
import { BrowserModule } from '@angular/platform-browser';
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
import { LoginPageComponent } from './login-page/login-page.component';
import { ConfirmDialog } from './templates/confirm-dialog';

// MATERIAL MODULE DECLARED
//CARSOUSAL MODULE

export const firebaseConfig = {
 

  apiKey: "AIzaSyAkgV9y_MuZ3RyyhGU1khuXktUhxtIntHM",
  authDomain: "cresumeker.firebaseapp.com",
  databaseURL: "https://cresumeker.firebaseio.com",
  projectId: "cresumeker",
  storageBucket: "cresumeker.appspot.com",
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
    FontColorChooserDialog,
    SectionEditDialog,
    ConfirmDialog,
  
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
TemplatesModule,
NgxImageGalleryModule,
AngularFireModule.initializeApp(firebaseConfig),
AngularFireDatabaseModule,
AngularFireAuthModule,
    RouterModule.forRoot(routes, {useHash: true}),
   
    /* ALL CUSTOM MODULES ADDED */
    ResumeTemplateModule,
    BrowserAnimationsModule,
    TimelineModule,
    
    ResumeContentSelectorModule,
    CommonSharedModule
    
   
  ],

  providers: [AuthService],
entryComponents:[FontColorChooserDialog,SectionEditDialog,ConfirmDialog],
  bootstrap: [AppComponent,FontColorChooserDialog,SectionEditDialog,ConfirmDialog]
  
})
export class AppModule {

  
 }
