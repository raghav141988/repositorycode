import { BrowseTemplateComponent } from './browse-template/browse-template.component';
import { SavedTemplateComponent } from './saved-template/saved-template.component';
import { UserTemplateComponent } from './user-template.component';

import { Routes, RouterModule }  from '@angular/router';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'myprofile',
    component: UserTemplateComponent,
    children: [
        { path: '',redirectTo: 'myresumes', pathMatch: 'full'},
        {path: 'myresumes', component: SavedTemplateComponent},
        {path: 'resumeTemplates', component: BrowseTemplateComponent},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
