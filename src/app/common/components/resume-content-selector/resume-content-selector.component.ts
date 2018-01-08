import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
@Component({
    moduleId: module.id,
    selector: 'resume-content-selector',
    templateUrl: 'resume-content-selector.component.html',
    styleUrls: ['resume-content-selector.component.scss']
})
export class ResumeContentSelectorComponent {
    public many:Array<string> = ['Header', 'Header with image', 'desc section', 'skills','Softwares','contact'];
    public many2:Array<string> = ['Explore', 'them'];
  
    public constructor(private dragulaService:DragulaService) {
      dragulaService.dropModel.subscribe((value:any) => {
        this.onDropModel(value.slice(1));
      });
      dragulaService.removeModel.subscribe((value:any) => {
        this.onRemoveModel(value.slice(1));
      });
    }
  
    private onDropModel(args:any):void {
      let [el, target, source] = args;
     
    }
  
    private onRemoveModel(args:any):void {
      let [el, source] = args;
     
    }
}
