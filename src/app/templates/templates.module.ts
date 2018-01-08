import { TemplateService } from './../common/components/layouts/templates/service/template.service';
import { SideNavContentComponent } from './side-nav-content/side-nav-content.component';
import { MaterialModule } from './../material/material.module';
import { CommonSharedModule } from './../common/common.shared.module';
import { Template5Component } from './../common/components/layouts/templates/template5/template5.component';
import { Template4Component } from './../common/components/layouts/templates/template4/template4.component';
import { Template3Component } from './../common/components/layouts/templates/template3/template3.component';
import { Template2Component } from './../common/components/layouts/templates/template2/template2.component';
import { Template1Component } from './../common/components/layouts/templates/template1/template1.component';
// Angular Imports
import { NgModule } from '@angular/core';
import { routing }       from './templates.routing';
// This Module's Components
import { TemplatesComponent } from './templates.component';
import { SavedTemplateComponent } from '../common/components/layouts/templates/saved-template/saved-template.component';
import { NgxImageGalleryModule } from 'ngx-image-gallery';


@NgModule({
    imports: [
CommonSharedModule,routing,MaterialModule,NgxImageGalleryModule
    ],
    declarations: [
   
        TemplatesComponent,
        Template1Component,
        Template2Component,
        Template3Component,
        Template4Component,
        Template5Component,
        SavedTemplateComponent,
        SideNavContentComponent
    ],
    providers:[TemplateService],
    exports: [
        TemplatesComponent,
    ]
})
export class TemplatesModule {

}
