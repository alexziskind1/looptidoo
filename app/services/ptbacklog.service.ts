import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { Injectable, NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from "../shared/store";
import { PtItem } from "../shared/models/domain-models";
import { baseUrl } from "../common/api-access";



@Injectable()
export class PtBacklogService {
    private get filterIndex() {
        return this.store.value.selectedViewIndex;
    }

    private get filteredBacklogUrl() {
        switch (this.filterIndex.idx) {
            case 0:
                const user = this.store.value.currentUser;
                if (user) {
                    return `${baseUrl}/myItems?userId=${this.store.value.currentUser.id}`;
                } else {
                    return `${baseUrl}/backlog`;
                }
            case 1:
                return `${baseUrl}/openItems`;
            case 2:
                return `${baseUrl}/closedItems`;
            default:
                return `${baseUrl}/backlog`;
        }
    }

    /*
    public getBacklog$ = this.http.get(this.filteredBacklogUrl)
        .map(res => res.json())
        .do((data: PtItem[]) => {
            this.store.set('backlogItems', data);
        });
        */

    constructor(private http: Http, private store: Store, private zone: NgZone) { }

    public fetchItems() {
        this.http.get(this.filteredBacklogUrl)
            .map(res => res.json())
            .catch((error: any) => {
                return Observable.throw(error.json().error || 'Server error');
            })
            .subscribe((data: PtItem[]) => {

                data.forEach(i => {
                    i.assignee.avatar = `${baseUrl}/photo/${i.assignee.id}`;
                });

                this.store.set('backlogItems', data);
            });
    }

    public getItem(id: number) {
        let selectedItem = _.find(this.store.value.backlogItems, i => i.id === id);
        return Promise.resolve(selectedItem);
    }

}