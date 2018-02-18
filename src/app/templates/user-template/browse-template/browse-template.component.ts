
import { UserDetailsService } from './../../../user-details-service';
import { Component } from '@angular/core';
import { sequence, trigger, stagger, animate, style, state, group, query, transition, keyframes, animateChild } from '@angular/animations';
import { TemplateService } from '../../../common/components/layouts/templates/service/template.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialog } from '../../confirm-dialog';
import { MatDialog } from '@angular/material';
import { Tile } from '../saved-template/Tile';
@Component({
    moduleId: module.id,
    selector: 'browse-template',
    animations: [


        trigger('stateAnimation', [
            state('false', style({
                transform: 'scale(1)'
            })),
            state('true', style({

                transform: 'scale(1.1)'
            })),
            transition('true => false', [
                style({
                    transform: 'scale(1.1)',

                }),
                animate('0.4s ease-out', style({

                    transform: 'scale(1)'
                }))
            ]),
            transition('false => true', [
                style({


                }),
                animate('0.4s ease-out', style({
                    transform: 'scale(1.1)',

                }))
            ])
        ]),

        trigger('listAnimation', [
            transition('* => *', [

                query(':enter', style({ opacity: 0 }), { optional: true }),

                query(':enter', stagger('500ms 1.2s', [
                    animate('1s ease-in', keyframes([
                        style({ opacity: 0, transform: 'translate(-75%)', offset: 0 }),
                        style({ opacity: .5, transform: 'translate(35px)', offset: 0.5 }),

                        style({ opacity: 1, transform: 'translate(0)', offset: 1.0 }),
                    ]))]), { optional: true }),
                query(':leave', stagger('500ms 1.2s', [
                    animate('1s ease-out', keyframes([
                        style({ opacity: 1, transform: 'translateY(35px)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateY(-75%)', offset: 0.5 }),

                        style({ opacity: 0, transform: 'translateY(0)', offset: 1.0 }),
                    ]))]), { optional: true })

            ])
        ])

    ],
    templateUrl: 'browse-template.component.html',
    styleUrls: ['browse-template.component.scss']
})
export class BrowseTemplateComponent {

    tiles= [
        {

           hovered:false,
            theme:"template1",
            thumbNail: "assets/img/templates/template1.png"
        },
        {
            hovered:false,
            theme:"template2",
            thumbNail: "assets/img/templates/template2.png"
        },
        {
            hovered:false,
            theme:"template3",
            thumbNail: "assets/img/templates/template3.png"
        },
        {
            hovered:false,
            theme:"template4",
            thumbNail: "assets/img/templates/template4.png"
        },
        {
            hovered:false,
            theme:"template5",
            thumbNail: "assets/img/templates/template5.png"
        },
        {
            hovered:false,
            theme:"template6",
            thumbNail: "assets/img/templates/template6.png"
        }
    ];


    userDetailsSubscription: Subscription;
    constructor(public dialog: MatDialog, private templateService: TemplateService, private userDetailService: UserDetailsService, private activatedRoute: ActivatedRoute, private router: Router) {


    }
    ngOnInit() {


    }

    openTemplate(tile:any){
        this.router.navigate(['/templates/'+tile.theme]);
    }
    openMySavedWork() {
        this.router.navigate(['/templates/mywork']);
    }

    onHover(tile:any,event:any){
        this.tiles.forEach((thisTile) => {
         if(thisTile.theme==tile.theme){
  thisTile.hovered=event;
         }else {
  //thisTile.colored=!event;
         }
  
  
  
        });
    }

}
