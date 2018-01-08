import { Component,ViewChild ,ElementRef} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ISlimScrollOptions } from 'ng2-slimscroll';



@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('scrollAnimation', [
  
      transition('* => *', [
        style({transform: 'translateY( 150px )'}),
        animate('500ms ease-in')
      ])
    ])
  ]
})
export class AppComponent {
  opts: ISlimScrollOptions;

  @ViewChild('copiedTemplate') copyElement: ElementRef;
  title = 'app';
  maxWidth="80%";
  text="<p> title</p>";
  state: string = 'non-click';

  animateMe() {
    this.state = (this.state === 'non-click' ? 'click' : 'non-click');
}
ngOnInit(){
  this.opts = {
    position: 'right',
    barBackground: '#ccc',
    barWidth:'8',
    barMargin:'0 2px'
 
  }
  
}
  




}
