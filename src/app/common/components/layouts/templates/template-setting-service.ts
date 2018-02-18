import { PageSettings } from './PageSettings';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { CardConfig } from '../CardConfig';

@Injectable()
export class TemplateSettingService {
    private subject = new Subject<any>();

    private editInfoSub = new Subject<any>();
    private sectionsUpdateSub = new Subject<any>();

    updateTemplateSetting(pageSettings: PageSettings) {
        this.subject.next(pageSettings);
    }
    broadCastEdit(data: any) {
        this.editInfoSub.next(data);
    }
    loadedSections(data: any) {
        this.sectionsUpdateSub.next(data);
    }

    clearMessage() {
        this.subject.next();
    }

    getSettingsSubscriber(): Observable<any> {
        return this.subject.asObservable();
    }

    clearEditSubMessage() {
        this.editInfoSub.next();
    }
    clearSecUpdateSubMessage() {
        this.sectionsUpdateSub.next();
    }

    getEditInfoSubscriber(): Observable<any> {
        return this.editInfoSub.asObservable();
    }

    getsectionUpdatesSubscriber(): Observable<any> {
        return this.sectionsUpdateSub.asObservable();
    }

   
}