
import { Component, HostListener, OnInit, ContentChild, ElementRef, Renderer2, ViewChild,Input } from '@angular/core';

@Component({
  selector: 'chat-window-resize',
  templateUrl: 'resizeable.component.html',
  styleUrls: ['resizeable.component.scss']
})
export class ResizableComponent implements OnInit {
  elementPosition:string="relative";
@Input('zindex')indexValue=9;
@Input('resize')resize=true;;
  x: number;
  y: number;
  px: number;
  py: number;
  width: number;
  height: number;
  minArea: number;
  draggingCorner: boolean;
  draggingWindow: boolean;
  resizer: Function;
  @ViewChild('resizeDiv') resizeDiv: ElementRef;
  @ViewChild('insideContent') nameRef: ElementRef;
  
  @ViewChild('topLeft') topLeft: ElementRef;
  @ViewChild('topRight') topRight: ElementRef;
  @ViewChild('bottomLeft') bottomLeft: ElementRef;
  @ViewChild('bottomRight') bottomRight: ElementRef;


  constructor() { 
    this.x = 0;
    this.y = 0;
    this.px = 0;
    this.py = 0;
   // this.width = 600;
   // this.height = 300; 
    this.draggingCorner = false;
    this.draggingWindow = false;
    this.minArea = 20000
  }

  ngOnInit() {
  }

  onDivSelect(){
    this.resizeDiv.nativeElement.style.cursor="move";
    
    this.topLeft.nativeElement.style.cursor="e-resize";
    this.topRight.nativeElement.style.cursor="e-resize";
    this.bottomLeft.nativeElement.style.cursor="e-resize";
    this.bottomRight.nativeElement.style.cursor="e-resize";

  }
	ngAfterContentInit() {
   
    // this.elementPosition="fixed";
   
    

var rect = this.resizeDiv.nativeElement.getBoundingClientRect();

this.resizeDiv.nativeElement.style.left=rect.left;
this.resizeDiv.nativeElement.style.top=rect.top;
this.height=this.resizeDiv.nativeElement.offsetHeight;
this.width=this.resizeDiv.nativeElement.offsetWidth;

//this.x=rect.left;
//this.y=rect.top;
//this.elementPosition="fixed";
  }
  
  ngAfterViewInit() {
   

  }
  area() {
    return this.width * this.height;
  }

  onWindowPress(event: MouseEvent) {
   
    this.draggingWindow = true;
    this.px = event.clientX;
    this.py = event.clientY;

    event.stopPropagation();
  }

  onWindowDrag(event: MouseEvent) {
   
     if (!this.draggingWindow) {
        return;
    }
    let offsetX = event.clientX - this.px;
    let offsetY = event.clientY - this.py;
/*   if(!this.x){
    this.x +=  this.resizeDiv.nativeElement.style.left;
   }
   if(!this.y) {
    this.y +=  this.resizeDiv.nativeElement.style.top;
   }
   */
    this.x += offsetX;
    this.y += offsetY;
    this.px = event.clientX;
    this.py = event.clientY;
    //this.resizeDiv.nativeElement.style.top=    this.y ;
   // this.resizeDiv.nativeElement.style.left= this.x ;
    
  }

  topLeftResize(offsetX: number, offsetY: number) {
    this.x += offsetX;
    this.y += offsetY;
    this.width -= offsetX;
    this.height -= offsetY;
     this.resizeDiv.nativeElement.style.width= this.width+"px" ;
  //  this.resizeDiv.nativeElement.style.height= this.height+"px" ;
  }

  topRightResize(offsetX: number, offsetY: number) {
    
    this.y += offsetY;
    this.width += offsetX;
    this.height -= offsetY;

    this.resizeDiv.nativeElement.style.width= this.width+"px" ;
  //  this.resizeDiv.nativeElement.style.height= this.height+"px" ;


  }

  bottomLeftResize(offsetX: number, offsetY: number) {
    this.x += offsetX;
    this.width -= offsetX;
    this.height += offsetY;
    this.resizeDiv.nativeElement.style.width= this.width+"px" ;
   // this.resizeDiv.nativeElement.style.height= this.height+"px" ;
  }

  bottomRightResize(offsetX: number, offsetY: number) {
    this.width += offsetX;
    this.height += offsetY;
    this.resizeDiv.nativeElement.style.width= this.width+"px" ;
   // this.resizeDiv.nativeElement.style.height= this.height+"px" ;
  }

  onCornerClick(event: MouseEvent, resizer?: Function) {
    
    this.draggingCorner = true;
    this.px = event.clientX;
    this.py = event.clientY;
    this.resizer = resizer;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:mousemove', ['$event'])
  onCornerMove(event: MouseEvent) {
    if (!this.draggingCorner) {
        return;
    }
    if(this.resize){
    let offsetX = event.clientX - this.px;
    let offsetY = event.clientY - this.py;

    let lastX = this.x;
    let lastY = this.y;
    let pWidth = this.width;
    let pHeight = this.height;

    this.resizer(offsetX, offsetY);
 
    this.px = event.clientX;
    this.py = event.clientY;
  }
  }

  @HostListener('document:mouseup', ['$event'])
  onCornerRelease(event: MouseEvent) {
    this.draggingWindow = false;
    this.draggingCorner = false;
  }
}