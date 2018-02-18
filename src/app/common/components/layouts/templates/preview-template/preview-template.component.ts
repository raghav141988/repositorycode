import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
declare var jquery: any;
declare var $: any;
declare var html2canvas;
declare var deflate;
import * as jsPDF from 'jspdf';
import { setInterval } from 'core-js/library/web/timers';

var max_pages = 100;
var page_count = 0;

function snipMe() {
    page_count++;
    if (page_count > max_pages) {
      return;
    }
    var long = $(this)[0].scrollHeight - Math.ceil($(this).innerHeight());
    var children = $(this).children().toArray(); // Save elements in this page to children[] array
    var removed = [];
    // Loop while this page is longer than an A4 page
    while (long > 0 && children.length > 0) {
      var child = children.pop(); // Remove last array element from the children[] array 
      $(child).detach();  // JQuery Method detach() removes the "child" element from DOM for the current page
      removed.push(child);  // Add element that was removed to the end of "removed" array
      long = $(this)[0].scrollHeight - Math.ceil($(this).innerHeight()); // Compute current size of the page 
    }
    // If elements were removed from the page 
    if (removed.length > 0) {
      var rev_removed = removed.reverse();  // Reverse the order of the removed array
      var a4 = $('<div class="A4" style="background: white;width: 21cm;height: 29.7cm;display: block;margin: 0 auto;padding: 10px 25px;margin-bottom: 0.5cm;box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);overflow-y: scroll;box-sizing: border-box;font-size: inherit;" ></div>'); // Start a new page
      a4.append(rev_removed); // Add elements removed from last page to the new page
      $(this).after(a4); // Add the new page to the document
      snipMe.call(a4[0]); // Recursively call myself to adjust the remainder of the pages
    }
  }


  $(document).ready(function() {
    $('.A4').each(function() {
        console.log(this);
      snipMe.call(this);
    });
  });
 
@Component({
    moduleId: module.id,
    selector: 'preview-template',
    templateUrl: 'preview-template.component.html',
    styleUrls: ['preview-template.component.scss']
})

export class PreviewTemplateComponent {
     max_pages = 100;
     page_count = 0;
   @ViewChild('printContent') printContent: ElementRef;
   @ViewChild('copyCanvas') copyCanvas: ElementRef;
   
  //  @ViewChild('container') container: ElementRef;

    

  /*  snipMe(div) {
        this.page_count++;
       
        if (this.page_count > this.max_pages) {
            return;
        }
      
       

        var long = div.nativeElement.scrollHeight-Math.ceil(div.nativeElement.offsetHeight)  ;
        console.log(long);
        var children = Array.from(div.nativeElement.children);
        var removed = [];
        while (long > 0 && children.length > 0) {
            var child = children.pop();
            console.log('Child');
            console.log(child);
       
            this.renderer.removeChild(div,child);

            removed.unshift(child);
            if (div.nativeElement.children[0]) {
                console.log(div.nativeElement.children[0]);
                long =  div.nativeElement.scrollHeight-Math.ceil(div.nativeElement.offsetHeight) ;
                console.log(long);
            } 
        }
        if (removed.length > 0) {

            var a4 = this.renderer.createElement('div');
            this.renderer.addClass(a4,'A4');
            //var a4 = $('<div class="A4"></div>');

            removed.forEach(
                (eachRemoved) => {

                    this.renderer.appendChild(a4,eachRemoved);
                }

            );



            this.renderer.appendChild(this.el.nativeElement,a4);
            console.log('calling next method');
            console.log(a4);
            console.log(a4.children[0]);
            this.snipMe(a4[0]);
        }



    }*/

    constructor(private renderer: Renderer2, private el: ElementRef) { }

    ngAfterViewInit() {
       // console.log(this.previewContent.nativeElement);
       
       // this.snipMe(this.previewContent);
    }


    download(){
        var count= this.printContent.nativeElement.children.length;
        console.log(count);
        var curCount=0;
        var doc = new jsPDF('p', 'mm','a4');
        var imgArray=[];
        [].forEach.call(this.printContent.nativeElement.children,
            (element) => {
                setTimeout(()=>{
                html2canvas(element).then((canvas) =>
                
                {
                       curCount++;
                       this.copyCanvas.nativeElement.appendChild(canvas);
                        var imgData = canvas.toDataURL('image/png');
                        console.log('******************');
                       
                        console.log('****************')
                        var a4 = $('<img src="'+imgData+'"/>');
     
                        //$('#copyCanvas').append(a4);
                      //  imgArray.push(imgData);
                        var imgWidth = 210; 
                        var pageHeight = 295;  
                        var imgHeight = canvas.height * imgWidth / canvas.width;
                        var heightLeft = imgHeight;
                  
                      
                        var position = 0;
                        
                        doc.addImage( imgData, 'PNG', 0, 0, 210, 297,'a'+curCount,'FAST');
                      

                              /*
                              Here are the numbers (paper width and height) that I found to work. 
                              It still creates a little overlap part between the pages, but good enough for me.
                              if you can find an official number from jsPDF, use them.
                              */
                             
    
                          
                            
                             
                           
                            if(curCount==count){
                                imgArray.forEach((eachImageData)=>{
                                   /*
                                    var imgWidth = 210; 
                                    var pageHeight = 295;  
                                    var imgHeight = canvas.height * imgWidth / canvas.width;
                                    var heightLeft = imgHeight;
                              
                                  
                                    var position = 0;
                                    
                                    doc.addImage( eachImageData, 'PNG', 0, 0, 210, 297,'','FAST');
                                    doc.addPage();
                                    */
                                });
                                

                                doc.save( 'file.pdf');
                            }else {
                                doc.addPage();
                            }
                            
                              
                            
                            
                
                          
                
                             
                    });
            
            }, 2000);
               
              
            }

        );
      

      
    }

            
}
