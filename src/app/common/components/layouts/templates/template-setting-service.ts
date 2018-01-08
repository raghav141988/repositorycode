import { PageSettings } from './PageSettings';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TemplateSettingService {
    private subject = new Subject<any>();

    updateTemplateSetting(pageSettings: PageSettings) {
        this.subject.next(pageSettings);
    }

    clearMessage() {
        this.subject.next();
    }

    getSettingsSubscriber(): Observable<any> {
        return this.subject.asObservable();
    }
}