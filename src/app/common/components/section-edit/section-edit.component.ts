import { CardConfig } from './../layouts/CardConfig';
import { Input } from '@angular/core';
import { Component ,ElementRef,ViewChildren,QueryList} from '@angular/core';
declare var nicEditors:any;
@Component({
    moduleId: module.id,
    selector: 'section-edit',
    templateUrl: 'section-edit.component.html',
    styleUrls: ['section-edit.component.scss']
})
export class SectionEditComponent {
  content="my testing";
  @ViewChildren('textArea') items: QueryList<ElementRef>;
converted=false;
  constructor(private elRef:ElementRef) {}
  ngAfterViewInit() {

  this.items.toArray().forEach(el => {
 //   nicEditors.convertTextArea(el.nativeElement);
});
  //console.log(this.items);
  }
  step = 0;
    
    @Input('data') data:CardConfig;
      setStep(index: number) {
        this.step = index;
      }
    
      nextStep() {
        this.step++;
      }
    
      prevStep() {
        this.step--;
      }
      onSave(data:CardConfig,className:string){
        this.items.toArray().forEach(el => {
        //  nicEditors.convertTextArea(el.nativeElement);

        var nicInstance = nicEditors.findEditor(el.nativeElement).getContent();
        let content=nicInstance;

        data.title=content;

      });
      
      }

      ngDoCheck(){
        
         if(  !this.converted &&  this.items){

          this.items.toArray().forEach(el => {
             nicEditors.convertTextArea(el.nativeElement);
           });
        
          this.converted=true;
         }
       }
       onBackgroundHeader(event:any,card:CardConfig){
        card.headerBackGround=event.colorValue;
        card.headerFontColor=event.fontColor;
       }
}
