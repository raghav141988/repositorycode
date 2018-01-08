/* tslint:disable:member-ordering */
import { Directive, ElementRef, HostListener, Input,Output,EventEmitter } from '@angular/core';

@Directive({
  selector: '[wrapperDirective]'
})
export class WrapperDirective {
    @Output() onHover = new EventEmitter<any>();
  constructor(private el: ElementRef) { }


  @HostListener('mouseenter') onMouseEnter() {
   
    this.onHover.emit(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.onHover.emit(false);
  }

  
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/