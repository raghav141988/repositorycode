import { ProgressSpinnerService } from './progress-spinner.service';
import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'progress-spinner',
    templateUrl: 'progress-spinner.component.html',
    styleUrls: ['progress-spinner.component.scss']
})
export class ProgressSpinnerComponent {
 constructor(public progressSpinnerService:ProgressSpinnerService){

 }
}
