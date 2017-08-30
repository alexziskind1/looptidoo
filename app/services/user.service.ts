//angular imports
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";



//3rd party imports
import * as _ from 'lodash';
import { Observable, Observer } from "rxjs/Rx";

//app imports
//import { MockDataService } from './mock-data.service';
import { PtUser } from '../shared/models/domain-models';
import { Store } from "../shared/store";
import { usersUrl, baseUrl } from "../common/api-access";

@Injectable()
export class UserService {

    //private _generatedUsers: Array<PtUser> = [];
    private _observer: Observer<Array<PtUser>>;

    //public get users(): Array<PtUser> {
    //    return this._generatedUsers;
    //}

    /*
    public get usersObs(): Observable<Array<PtUser>> {
        return Observable.create((observer: Observer<Array<PtUser>>) => {
            this._observer = observer;
            observer.next(this._generatedUsers);
        });
    }
    */

    public get users(): PtUser[] {
        return this.store.value.users;
    }

    constructor(private http: Http, private store: Store
        //private mockDataService: MockDataService
    ) {
        //this._generatedUsers = this.mockDataService.generateUsers();
        this.fetchUsers();
    }

    public fetchUsers() {
        this.http.get(usersUrl)
            .map(res => res.json())
            .catch((error: any) => {
                return Observable.throw(error.json().error || 'Server error');
            })
            .subscribe((data: PtUser[]) => {

                data.forEach(u => {
                    u.avatar = `${baseUrl}/photo/${u.id}`;
                });

                this.store.set('users', data);
            });
    }

    //public getUserAvatar(userId: number) {
    //    let user = _.find(this.users, (user) => user.id === userId);
    //    return user.avatar;
    //}
}
