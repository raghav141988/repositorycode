import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class LayoutService {
    private url: string = 'http://web-dev.swissre.com/webapp/cfc/ws/restApp/OutLook/Search';
        private options: any;
    private headers: any;

    private objToPost:any = {
        "sortDirection": "DESC",
        "sortColumnCode": "WORK_OBJECT_ID",
        "sectionCode": "MAILS_TABLE",
        "statsNeeded": "false",
        "additionalCriteria": { "REGION": "EMEA" },
        "startRow": "10",
        "userInfo": {
            "userRole": "CLAIMS_HANDLER",
            "userId": "S07F53"
        },
        "endRow": "100"
    }

    private attributesToGetData: any;
    constructor(private _http: Http) {

    }
    public setUrl(url, attr?) {
        if (attr) {
            if (typeof (attr) != 'string') {
                this.attributesToGetData = JSON.stringify(attr);
            } else {
                this.attributesToGetData = attr;
            }
            this.url = url + this.attributesToGetData;
        } else {
            this.url = url
        }
    }
    public postClientData() {
        // return this._http.get(this.url).map(res => res.json());
        
        this.headers = new Headers();
         
        this.options = new RequestOptions({ headers: this.headers, withCredentials: true }); // Create a request option (For Local env)



                    //   let dummy =  JSON.stringify(this.attributesToGetData); 

        return this._http.post(this.url,this.attributesToGetData,this.options).map(response => response.json());

    }

    public getClientData(){
        return this._http.get(this.url).map(response => response.json());
    }

}