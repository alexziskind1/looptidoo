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

    constructor(private http: Http, private store: Store
        //private mockDataService: MockDataService
    ) {
        //this._generatedUsers = this.mockDataService.generateUsers();
    }

    //public getUserAvatar(userId: number) {
    //    let user = _.find(this.users, (user) => user.id === userId);
    //    return user.avatar;
    //}
}
