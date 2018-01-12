import { Directive, ElementRef, AfterViewChecked ,Input} from '@angular/core';

@Directive({
 selector: '[autoFocus]',
})
export class FocusDirective  {
@Input('autoFocus')focus:boolean;
  constructor(private _elementRef: ElementRef) { }

  ngAfterViewInit() {
   if(focus){
    this._elementRef.nativeElement.focus()
  }
  }

}