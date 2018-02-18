import { SharedTemplateComponent } from './shared-template/shared-template.component';

import { PreviewTemplateComponent } from './../common/components/layouts/templates/preview-template/preview-template.component';
//mport { SavedTemplateComponent } from './../common/components/layouts/templates/saved-template/saved-template.component';
import { Template5Component } from './../common/components/layouts/templates/template5/template5.component';
import { Template4Component } from './../common/components/layouts/templates/template4/template4.component';
import { Template3Component } from './../common/components/layouts/templates/template3/template3.component';
import { Template2Component } from './../common/components/layouts/templates/template2/template2.component';
import { Template1Component } from './../common/components/layouts/templates/template1/template1.component';
import { TemplatesComponent } from './templates.component';
import { Routes, RouterModule }  from '@angular/router';
import { Template6Component } from '../common/components/layouts/templates/template6/template6.component';
import { UserProfileComponent } from './side-nav-content/user-profile-component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'templates',
    component: TemplatesComponent,
    children: [
        {path: 'template1', component: Template1Component,data: { animation: 'template1' }},
        { path: 'template2', component: Template2Component ,data: { animation: 'template2' }},
        { path: 'template3', component: Template3Component ,data: { animation: 'template3' }},
        { path: 'template4', component: Template4Component,data: { animation: 'template4' }},
        { path: 'template5', component: Template5Component,data: { animation: 'template5' }},
        { path: 'template6', component: Template6Component,data: { animation: 'template6' }},
        { path: 'openResume', component: SharedTemplateComponent},
      //  { path: 'openTemplate', component: SavedTemplateComponent},
        { path: 'myprofile', component: UserProfileComponent},
        { path: 'preview', component: PreviewTemplateComponent},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
