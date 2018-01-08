
import { MatDialog } from '@angular/material';
import { Skill } from './../../skill';
import { Input, ElementRef,ViewChild,SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';
import * as Chart from 'chart.js';
@Component({
   
    selector: 'donut-chart',
    templateUrl: 'donut-chart.component.html',
    styleUrls: ['donut-chart.component.scss']
})
export class DonutChartComponent {
@Input() chartId:number;
@Input() skill:Skill;
@ViewChild('donutChart') donutChart: ElementRef;
@Input() color:string;
constructor(public dialog: MatDialog) {}


public loadDonutChart(){


    Chart.pluginService.register({
        beforeDraw: function (chart) {
            if (chart.config.options.elements.center) {
        //Get ctx from string
        var ctx = chart.chart.ctx;
        
                //Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
                var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
        //Start with a base font of 30px
        ctx.font = "20px " + fontStyle;
        
                //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
    
        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);
    
        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight);
    
                //Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      //  ctx.font = fontSizeToUse+"px " + fontStyle;
        ctx.fillStyle = color;
        
        //Draw text in center
        ctx.fillText(txt, centerX, centerY);
            }
        }
    });
    this.donutChart.nativeElement.width="175";
    this.donutChart.nativeElement.height="175";
    let ctxDonut =this.donutChart.nativeElement.getContext('2d');
    let myDonutChart = new Chart(ctxDonut, {
       type: 'doughnut',
       data: {
          
           datasets: [{
             
               data: [Number(this.skill.value), 100-Number(this.skill.value)],
               backgroundColor: [
              //   '#1976d2',
              this.color,
                 '#efefef'
                
               ]
              
           }]
       },
       options: {
         responsive: false,
         segmentShowStroke : true,
         display:true,
         segmentStrokeColor : "#fff",
         segmentStrokeWidth : 1,
         cutoutPercentage : 90,
         animationSteps : 100,
         width:100,
         height:100,
         showTooltips: false,
         events: [],
         animationEasing : "easeOutBounce",
         elements: {
            center: {
                text: this.skill.name,
      color: '#1976d2', // Default is #000000
      fontStyle: 'Arial', // Default is Arial
      sidePadding: 20 // Defualt is 20 (as a percentage)
            }
        }
       }
   });

  }
  ngAfterViewInit(){
      this.loadDonutChart();
  }

  ngOnChanges(changes: SimpleChanges){
  this.color=   changes.color.currentValue;
  
  if(changes){
  this.loadDonutChart();
  }

    }
}
