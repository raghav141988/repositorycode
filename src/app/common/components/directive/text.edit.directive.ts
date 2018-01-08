/* tslint:disable:member-ordering */
import { Directive, ElementRef, HostListener, Input,Output,EventEmitter } from '@angular/core';

@Directive({
  selector: '[textEditDirective]'
})
export class TextEditDirective {
    @Output() onDoubleClick = new EventEmitter<any>();
  constructor(private el: ElementRef) { }


  @HostListener('dblclick', ['$event'])
  onDblClick(event) {
    this.onDoubleClick.emit(true);
  }


  
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/