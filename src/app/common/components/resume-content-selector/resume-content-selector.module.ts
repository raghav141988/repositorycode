import { DragulaModule } from 'ng2-dragula';
import { MaterialModule } from './../../../material/material.module';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ResumeContentSelectorComponent } from './resume-content-selector.component';


@NgModule({
    imports: [
        MaterialModule,
        DragulaModule
    ],
    declarations: [
        ResumeContentSelectorComponent,
    ],
    exports: [
        ResumeContentSelectorComponent,
    ]
})
export class ResumeContentSelectorModule {

}
