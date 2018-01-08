import { SavedTemplateComponent } from './../common/components/layouts/templates/saved-template/saved-template.component';
import { Template5Component } from './../common/components/layouts/templates/template5/template5.component';
import { Template4Component } from './../common/components/layouts/templates/template4/template4.component';
import { Template3Component } from './../common/components/layouts/templates/template3/template3.component';
import { Template2Component } from './../common/components/layouts/templates/template2/template2.component';
import { Template1Component } from './../common/components/layouts/templates/template1/template1.component';
import { TemplatesComponent } from './templates.component';
import { Routes, RouterModule }  from '@angular/router';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'templates',
    component: TemplatesComponent,
    children: [
        {path: 'template1', component: Template1Component},
        { path: 'template2', component: Template2Component },
        { path: 'template3', component: Template3Component },
        { path: 'template4', component: Template4Component},
        { path: 'template5', component: Template5Component},
        { path: 'mywork', component: SavedTemplateComponent},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
