
import { CommonSharedModule } from './../common/common.shared.module';
import { MaterialModule } from './../material/material.module';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ResumeTemplateComponent } from './resume-template.component';

@NgModule({
    imports: [
        MaterialModule,
        CommonSharedModule
    ],
    declarations: [
        ResumeTemplateComponent
    ],
 
    exports: [
        ResumeTemplateComponent,
        CommonSharedModule
       
    ]
})
export class ResumeTemplateModule {

}
