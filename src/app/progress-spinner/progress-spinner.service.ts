import { Injectable, Type } from '@angular/core';
@Injectable()
export class ProgressSpinnerService {
    showProgress:boolean;
    public startProgressBar(){
        this.showProgress=  true;
    }
    public endProgressBar(){
        this.showProgress=  false;
    }

    public getCurrentProgressStatus(){
        return this.showProgress;
    } 
}
