import { Directive, ElementRef, Input, OnChanges, Sanitizer, SecurityContext,
    SimpleChanges } from '@angular/core';
  
  // Sets the element's innerHTML to a sanitized version of [safeHtml]
  @Directive({ selector: '[safeHtml]' })
  export class SafeHtmlDirective implements OnChanges {
    @Input() safeHtml: string;
  
    constructor(private elementRef: ElementRef, private sanitizer: Sanitizer) {}
  
    ngOnChanges(changes: SimpleChanges): any {
      if ('safeHtml' in changes) {
          console.log(this.safeHtml);
        this.elementRef.nativeElement.innerHTML =
          this.sanitizer.sanitize(SecurityContext.HTML, this.safeHtml);
      }
    }
  }