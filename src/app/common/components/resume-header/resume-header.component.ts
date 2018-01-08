import { ResumeHeader } from './ResumeHeader';
import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'resume-header',
    templateUrl: 'resume-header.component.html',
    styleUrls: ['resume-header.component.scss']
})
export class ResumeHeaderComponent {
    name:string;
    title:string;
    desc: string;
    height:string;
    enablePhoto:boolean;
    borderRadius:number=50;
url:string;
resumeHeader:ResumeHeader={'name':'Raghavendra Bhatt','title':'Computer Programmer','desc':'Java programmer with 5 year experience','height':150,'enablePhoto':true};
    
readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
