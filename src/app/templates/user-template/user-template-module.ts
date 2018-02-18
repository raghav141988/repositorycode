import { BrowseTemplateComponent } from './browse-template/browse-template.component';
import { SavedTemplateComponent } from './saved-template/saved-template.component';
import { UserTemplateComponent } from './user-template.component';
import { CommonSharedModule } from './../../common/common.shared.module';


import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import {routing} from './user-template-routing';
import { UserProfileComponent } from '../side-nav-content/user-profile-component';

@NgModule({
    imports: [
CommonSharedModule,MaterialModule,NgxImageGalleryModule,routing

    ],
    declarations: [
        
       UserTemplateComponent,
       UserProfileComponent,
       SavedTemplateComponent,
       BrowseTemplateComponent
    ],
   
   
})
export class UserTemplateModule {

}
