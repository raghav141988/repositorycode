import { Component, ViewChild,ElementRef, Type, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { LayoutService } from './layouts.service';
import { tab1Data } from './tab1Rows';
import { tab2Data } from './tab2Rows';
import { tab3Data } from './tab3Rows';

import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'style-loader!./layout.scss';
import { CardConfig } from './CardConfig';
import * as Chart from 'chart.js'

@Component({
  selector: 'layouts',
  templateUrl: './layouts.html',
  styleUrls:['./layouts.html'],
})
//

export class Layouts {
  @ViewChild('cardTemplate') cardTemplate: any;
  @ViewChild('card1Template') card1Template: any;
  @ViewChild('card2Template') card2Template: any;
  @ViewChild('card3Template') card3Template: any;
  @ViewChild('card4Template') card4Template: any;
  @ViewChild('card5Template') card5Template: any;
  @ViewChild('card6Template') card6Template: any;
  @ViewChild('pieChart') pieChart: ElementRef;
  @ViewChild('donutChart') donutChart: ElementRef;
  @ViewChild('lineChart') lineChart: ElementRef;
  @Input() dragIndex;

  droppableCards = ["123", "345", "456", "567", "789","889","989"];
  cardToTemplateMaping: { [type: string]: Type<ViewChild> } = {};;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  CARD_DETAILS: CardConfig = { title: 'Personal', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '123' , index: '0', isEnlarge: false};
  CARD_DETAILS1: CardConfig = { title: 'Work', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '345' , index: '1' , isEnlarge: false};
  CARD_DETAILS2: CardConfig = { title: 'Software', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '456' , index: '2', isEnlarge: false};
  CARD_DETAILS3: CardConfig = { title: 'Professional Skills', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '567', index: '3', isEnlarge: false };
  CARD_DETAILS4: CardConfig = { title: 'Interests', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '789', index: '4', isEnlarge: false };
  CARD_DETAILS5: CardConfig = { title: 'Education', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '889', index: '5', isEnlarge: false };
 CARD_DETAILS6: CardConfig = { title: 'My Card 6', cardClass: 'col-md-6', isCardNavigationEnabled: true, isDraggable: true, isDroppable: true, cardId: '989', index: '6', isEnlarge: false };
private cardIndex:any;
private cardsList:any=[this.CARD_DETAILS,this.CARD_DETAILS1,this.CARD_DETAILS2,this.CARD_DETAILS3,this.CARD_DETAILS4,this.CARD_DETAILS5,this.CARD_DETAILS6];
private maximizedCardList1:any=[];
private maximizedCardList2:any=[];
  private tab1Cols: any;
  private tab1Rows: any = tab1Data.data;
  private ObjConfig1: any = {
    "sortDirection": "DESC",
    "sortColumnCode": "PROGRAM_ID",
    "sectionCode": "PROGRAM_TABLE",
    "statsNeeded": "false",
    "additionalCriteria": {},
    "filterCriteria": {},
    "startRow": "1",
    "userInfo": {
      "userRole": "CLAIMS_HANDLER",
      "userId": "S2HBJP"
    },
    "endRow": "100"
  }
  ;
  private headerUrl1: any;

  private tab2Cols: any;
  // private tab2Rows:any = tab2Data.data;
  private ObjConfig2: any;
  private headerUrl2: any;

  private tab3Cols: any;
  private tab3Rows: any = tab3Data.data;
  private ObjConfig3: any;
  private headerUrl3: any;
  private columnCount: any = 2;
  private actionItems = ["View","Summary","delete"];
  private  maximisedCard:boolean=false;
  private  minized:boolean=false;
  
  getCardTemplate(cardId: string ) {
    
    return this.cardToTemplateMaping[cardId ];
  }

  states: any[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];
ngDoCheck(){
//  console.log("after view initialized");
//     console.log(this.donut);
  
//     let ctx = this.donut.nativeElement.getContext('2d');
//     let myChart = new Chart(ctx, {
//       type: 'pie',
//       data: {
//           labels: ["New", "In Progress", "On Hold"],
//           datasets: [{
//               label: '# of Votes',
//               data: [1,2,3],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 1)',
//                   'rgba(54, 162, 235, 1)',
//                   'rgba(255, 206, 86, 1)'
//               ],
//               borderWidth: 1
//           }]
//       },
//       options: {
//         responsive: false,
//         display:true
//       }
//     });
}
public loadPieChart(){
  
  
}
public loadDonutChart(){
  
}
public loadLineChart(){

}

  ngAfterViewInit(){
    //Pie chart
   this.loadPieChart();
    // Donut chart
    this.loadDonutChart();
    // basic line chart
  this.loadLineChart();
  }
  onActionClick() {

  }
  onNavigationClick() {

  }
  onEnlarge(event) {
    console.log("Enlarge")
    console.log(event)
    this.cardIndex=event;
    this.maximisedCard=true;
    this.cardsList[this.cardIndex].isEnlarge = true;
    if (event){
      this.maximizedCardList1=this.cardsList.slice(0, this.cardIndex);
      this. maximizedCardList2=this.cardsList.slice( Number(this.cardIndex)+1,this.cardsList.length);
          }
      // if( this.lineChart.nativeElement){
      //   this.loadLineChart();
      // }
      // else if(this.pieChart.nativeElement){
    
      // }
      // else {
      //   this.loadDonutChart();
      //     }
      this.ref.detectChanges();
          this.loadLineChart();
          this.loadPieChart();
          this.loadDonutChart();
          
     // this.loadPieChart();
     // console.log("nativeelement")
     // console.log(this.pieChart.nativeElement.getContext('2d'))
  }
  onMinimize(event) {
    console.log("Minimize")
    console.log(event)
    //this.columnCount = 2;
    this.maximisedCard=false;
    this.ref.detectChanges();
    this.loadLineChart();
    this.loadPieChart();
    this.loadDonutChart();
    //this.minized=true;
  }

  filterStates(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  private cardStartIndex:any;
  constructor(private _formBuilder: FormBuilder, private layoutService: LayoutService, private ref:ChangeDetectorRef) {

    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(state => state ? this.filterStates(state) : this.states.slice());
    console.log("Adding in constructor");
    /*    this.cardToTemplateMaping["123"]=this.cardTemplate;
   this.cardToTemplateMaping["345"]=this.card1Template;
   this.cardToTemplateMaping["456"]=this.card2Template;
   this.cardToTemplateMaping["567"]=this.card3Template;
   this.cardToTemplateMaping["789"]=this.card4Template;
   */
    let self = this;

    //headers for table1
    this.layoutService.setUrl('http://web-dev.swissre.com/webapp/cfc/ws/restApp/claimHandlingAgreemnet/loadTableInfo/PROGRAM_TABLE');
    this.layoutService.getClientData().subscribe((res) => {
      self.tab1Cols = res.tableHeader;

    })

    //headers for table 2
    this.layoutService.setUrl('http://web-dev.swissre.com/webapp/cfc/ws/restApp/claimHandlingAgreemnet/loadTableInfo/PREFFERED_PARTNERS_TABLE');
    this.layoutService.getClientData().subscribe((res) => {
      self.tab2Cols = res.tableHeader;
      console.log(self.tab2Cols);
      // console.log(self.tab2Rows);
    })

    //headers for table3

    this.layoutService.setUrl('http://web-dev.swissre.com/webapp/cfc/ws/restApp/claimHandlingAgreemnet/loadTableInfo/CHA_NOTES_TABLE');
    this.layoutService.getClientData().subscribe((res) => {
      self.tab3Cols = res.tableHeader;

    })

  }

  // will have to use the below functions for service calls in future 
  // public makeGetServiceCall(url,attr?){
  //   this.layoutService.setUrl(url,attr);
  //   let self = this
  //   this.layoutService.getClientData().subscribe((res) =>{
  //     self.tab1Cols =  res.columns;
  //     console.log(self.tab1Cols);
  //     console.log(self.tab1Rows)
  //   })
  // }
  // public makePostServiceCall(url,attr?){
  //   this.layoutService.setUrl(url,attr);
  //   this.layoutService.postClientData().subscribe((res) =>{
  //     console.log('url1')
  //     console.log(res);
  //   })
  // }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    //= {"123":this.cardTemplate,"345":this.card1Template,"456":this.card2Template,"567":this.card3Template,"789":this.card4Template}

    // droppableCards = ["123","345","456","567","789"];
    this.cardToTemplateMaping["123"] = this.cardTemplate;
    this.cardToTemplateMaping["345"] = this.card1Template;
    this.cardToTemplateMaping["456"] = this.card2Template;
    this.cardToTemplateMaping["789"] = this.card4Template;
    this.cardToTemplateMaping["567"] = this.card3Template;
    this.cardToTemplateMaping["889"] = this.card5Template;
    this.cardToTemplateMaping["989"] = this.card6Template;
   
  }

  vegetables = [
    { name: 'Carrot', type: 'vegetable' },
    { name: 'Onion', type: 'vegetable' },
    { name: 'Potato', type: 'vegetable' },
    { name: 'Capsicum', type: 'vegetable' }];

  fruits = [
    { name: 'Apple', type: 'fruit' },
    { name: 'Orange', type: 'fruit' },
    { name: 'Mango', type: 'fruit' },
    { name: 'Banana', type: 'fruit' }];

  droppedFruits = [];
  droppedVegetables = [];
  droppedItems = [];
  fruitDropEnabled = true;
  dragEnabled = true;

  onFruitDrop(e: any) {
    this.droppedFruits.push(e.dragData);
    this.removeItem(e.dragData, this.fruits);
  }

  onVegetableDrop(e: any) {
    this.droppedVegetables.push(e.dragData);
    this.removeItem(e.dragData, this.vegetables);
  }

  onAnyDrop(e: any) {
    this.droppedItems.push(e.dragData);

    if (e.dragData.type === 'vegetable') {
      this.removeItem(e.dragData, this.vegetables);
    } else {
      this.removeItem(e.dragData, this.fruits);
    }
  }

  removeItem(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.name
    }).indexOf(item.name);
    list.splice(index, 1);
  }

  demoCards = [{ id: 1, title: "Title 1", content: "My Card 1 content" },
  { id: 2, title: "Title 2", content: "My Card 2 content" },
  { id: 3, title: "Title 3", content: "My Card 3 content" }];

  list1 = [
    { name: 'Toyota' },
    { name: 'Bugati' },
    { name: 'Suzuki' },
    { name: 'Honda' },
    { name: 'BMW' }
  ];

  list2 = [
    { name: 'Mercedes' },
  ];
onCardDrag(event:any){
   console.log("cardId Drag")
console.log(event.cardStartId)
this.cardStartIndex=event.cardStartId;
}


  onCardDrop(e: any) {
   let dragCardIndex =  this.cardStartIndex;
   let dropCardIndex = e.cardId;
    let b = this.cardsList[e.cardId];
    this.cardsList[e.cardId]= this.cardsList[this.cardStartIndex];
    this.cardsList[this.cardStartIndex]= b;
    this.cardsList[e.cardId].index = dropCardIndex;
    this.cardsList[this.cardStartIndex].index = dragCardIndex;
    console.log(this.cardsList)
  }
  swap(array,a,b){
    let tmp:any;
    tmp=array[a];
    array[a]=array[b];
    array[b]=tmp;
    //swap(array_of_numbers,0,4);
  }
  onNewDrop(e: any, target: any) {
    /*  this.droppedItems.push(e.dragData);

      if(e.dragData.type === 'vegetable')
          this.removeItem(e.dragData, this.vegetables);
      else
          this.removeItem(e.dragData, this.fruits); */
    console.log(e.dragData);
    console.log(target);
    let temp = this.cardToTemplateMaping[e.dragData];
    this.cardToTemplateMaping[e.dragData] = this.cardToTemplateMaping[target];
    this.cardToTemplateMaping[target] = temp;
    /*let temp=e.dragData;
    e.dragData=target;
    target=temp;*/
    /*   let temp=this.customCardTemplate;
       this.customCardTemplate=this.customCardTemplate1;
       this.customCardTemplate1=temp;
      */
  }
  onList1Drop(e: any) {
    this.list1.push(e.dragData);
    this.removeItem(e.dragData, this.list2)
  }

  onList2Drop(e: any) {
    this.list2.push(e.dragData);
    this.removeItem(e.dragData, this.list1)
  }

  swapItem(source: any, target: any, list: Array<any>) {

    let sourceIndex = list.map((e) => {
      return e.id
    }).indexOf(source.id);

    let targetIndex = list.map((e) => {
      return e.id
    }).indexOf(target.id);

    var b = list[sourceIndex];
    list[sourceIndex] = list[targetIndex];
    list[targetIndex] = b;

  }

  public actionSelected(event){
    console.log(event)
  }
  public clickRow(event){
    console.log(event)
}

}
