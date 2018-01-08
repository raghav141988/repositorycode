import {Component, Input, Output, EventEmitter, ContentChild, ContentChildren, ViewChild, ViewContainerRef,ElementRef,ChangeDetectorRef,
  HostListener, ComponentRef, ComponentFactory, ComponentFactoryResolver} from '@angular/core';
import {CardConfig} from './CardConfig';
//import {Router} from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import 'style-loader!./card.scss';
@Component({
  selector: 'custom-card',
  templateUrl: './card.html',
  styleUrls:['./card.scss'],
  animations: [
  trigger('cardState', [
    state('flip', style({
   transform: ' rotatey(0deg)'
    })),
    state('non-flip',   style({

     transform: ' rotatey(0deg)'
    })),
    state('enlarge',   style({
    width: ' 100%'
    })),
  transition('flip => non-flip', [
animate('400ms ease-out', style({
'transform-style': 'preserve-3d',
    transform: 'rotatey(180deg)',
  }))
]),
  transition('non-flip => flip', [
  animate('400ms ease-in', style({
  transform: 'rotatey(-180deg)', 
  })), 
]),
transition('* => flip', [

  animate('400ms ease-in', style({
  transform: 'rotatey(-180deg)',
   
  })),
  
]),
transition('* => close', [

  animate('400ms ease-in', style({
  transform: 'scale(0)',
  opacity:0.7,
   
  })),
  
]),

transition('* => enlarge', [

 animate('400ms ease-in', style({
  width: '150%',
   
  })),
  
]),
transition('enlarge => normal', [

 animate('400ms ease-out', style({
  width: '50%',
   
   
  })),
  
]),

  ]),
  
  
  trigger('dragDrop', [
     state('dragging', style({
     
      transform: 'translateX(0px)',
    
    })),
    transition('* => close', [

  animate('400ms ease-in', style({
  transform: 'scale(0)',
  opacity:0.7,
   
  })),
  
]),
    /* state('dragging', style({
     
      transform: 'translateX('+this.dragX+'px)',
    
    })),*/
  transition('* => drag', [
  
  animate('400ms ease-out', style({
  
  
    'transform-style': 'preserve-3d',
    transform: 'rotatey(180deg)',
  }))
]),
  
     transition('drag => dragging', [

  animate('400ms ease-in', style({
  transform: 'rotatey(-180deg)',
   
  })),
  
]),
transition('dragging => dropped', [

  animate('400ms ease-in', style({
  transform: 'rotatey(-180deg)',
   
  })),
  
]),

  ])
  
  
  
  
  
  
  
]
  
  
})
export class Card {
@Input() config:CardConfig;
@Input() enableAction;
@Input() enableNavigation;
@Input() maximisedCard;
private isViewInitialized:boolean = false;
 displayNone:string='visible';
@Output() onNavigationClick = new EventEmitter();
@Output() onActionIconClick = new EventEmitter();
@Output() onCardDrop = new EventEmitter();
@Output() onCardDrag=new EventEmitter();
@Output() onEnlargeClick = new EventEmitter();
@Output() onMinimizeClick = new EventEmitter();
droppableCards = ["123","345","456","567","789","889","989"];
  state: 'normal'| 'flip'| 'non-flip' |'close'|'enlarge';
  dragState: 'drag'| 'dragging' |'dropped';
  isDragging=false;
  doEnlarge=false;
  @ViewChild('customCard') content;
  
//  private cardEnlarge:any=2;
private makeEnlarge:boolean=false;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,private cdRef:ChangeDetectorRef/*,private router: Router*/) { 

  }
  updateComponent() {
    // this.cdRef.detectChanges();
  }
isClosed=false;
dragX;
dragY;
dragYOffset;
dragXOffset;
//DRAGGING
  curX: number;
    curY: number;
    curZIndex: number;
    xStartElementPoint: number;
    yStartElementPoint: number;
    xStartMousePoint: number;
    yStartMousePoint: number;
onNavigation(event:any){
   this.onNavigationClick.emit(event);
   if(this.state=='flip'){
   this.state='non-flip';  
   }
   else {
     this.state='flip';
   }
   
   
  //this.router.navigateByUrl('/pages/forms/table');
}
   

onClose(event:any){
   this.state='close';
   //this.isClosed=true;
    this.displayNone='none';
    setTimeout(()=>{this.isClosed=true;  }, 300);
   
}
  ngOnInit() {
  }
  ngOnChanges() {
    this.updateComponent();
  }

  ngAfterViewInit() {
      
       //this.content.nativeElement.innerHTML=`<md-tab-group><md-tab label=Tab 1>Content 1</md-tab><md-tab label=Tab 2>Content 2</md-tab></md-tab-group>`;
        this.isViewInitialized = true;
    //    let tdiv1 = this.div1.clone();
//let tdiv2 = this.div2.clone();

//if(!this.div2.is(':empty')){
    //this.div1.replaceWith(tdiv2);
  
    
  
//}
     this.updateComponent();  
    }
    ngAfterContentInit(){
       console.log('Testing: '+this.content);
      
    }
      onDragStart(event:any,index:any){
   // console.log('onDrag Start');
   // console.log(event);
   this.dragState='drag';
   var top: number = + this.content.nativeElement.style.top.replace("px", "");
        var left: number = + this.content.nativeElement.style.left.replace("px", "");
        this.dragYOffset = event.y - top;
        this.dragXOffset = event.x - left;
        
        
             this.xStartElementPoint = left;
            this.yStartElementPoint = top;
            //MOUSE POSITION
             this.xStartMousePoint = event.pageX;
            this.yStartMousePoint = event.pageY;
            
        console.log( this.xStartElementPoint);
        console.log( this.yStartElementPoint);
        console.log( this.xStartMousePoint);
        console.log( this.yStartMousePoint);
        console.log("cardstrartid")
        console.log(index)
        this.onCardDrag.emit({ daragInfo:event ,cardStartId: index});
  }
    onDrag(event:any,index:any){
   // console.log('onDrag');
   // console.log(event);
console.log(index)
  //console.log("dragging strat")
  
 // this.content.nativeElement.style.top = ( event.clientY-this.dragYOffset-20) + "px";
  //this.content.nativeElement.style.left = ( event.clientX-this.dragXOffset-20) + "px";
  // this.curX = this.xStartElementPoint + (event.pageX - this.xStartMousePoint);
//  this.curY = this.yStartElementPoint + (event.pageY - this.yStartMousePoint);
  //  this.content.nativeElement.style.left=(this.curX)+ "px";
  //  this.content.nativeElement.style.top=(this.curY)+ "px";
  }
  
    onDragEnd(event:any){
   // console.log('onDrag End');
   // console.log(event);
    this.isDragging=false;
    console.log(this.content);
  }
  onDrop(e: any,target:any,index:any) {
    console.log('card dropped');
     console.log(this.content.nativeElement);
     this.onCardDrop.emit({ daragInfo:e, targetCard: target,cardId: index});
      this.dragState='dropped';
  }
  onEnlarge(event:any){
    this.state='enlarge';
console.log("enlarge")
let self = this;
    this.onEnlargeClick.emit(this.config.index);
    setTimeout(() => {
      self.doEnlarge=true;
      // self.cdRef.detectChanges();
    }, 1000); 
    console.log("is Enlarge")
    console.log(this.config.isEnlarge)
    console.log("maximizex")
    console.log(this.maximisedCard)
  }
  onMinimize(event:any){
     this.onMinimizeClick.emit(event);
    // this.cardEnlarge=2;
     this.state='normal';
      setTimeout(() => this.doEnlarge=false, 500); 
    if( this.state='enlarge'){
     
     this.state='normal';
     console.log("normal")
     setTimeout(() => this.doEnlarge=false, 500); 
     
    } else {
      console.log("normal else")
    }
  //  setTimeout(() => this.doEnlarge=true, 500); 
    
  }
}
