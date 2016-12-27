//angular imports
import { Injectable, OnInit, NgZone } from '@angular/core';
import { Observable, Observer, BehaviorSubject } from "rxjs/Rx";

//3rd party imports
import * as _ from 'lodash';

//app imports
import { UserService } from './user.service';
import { MockDataService } from './mock-data.service';
import { PTDomain } from '../typings/domain';
import IUser = PTDomain.IUser;
import IPTItem = PTDomain.IPTItem;


@Injectable()
export class BacklogService {

    private _genetatedItems: Array<IPTItem> = [];
    private _itemsObs: Observable<Array<IPTItem>>;
    private _itemsSubj: BehaviorSubject<Array<IPTItem>>;
    private _observer: Observer<Array<IPTItem>>;
    private _allItems: Array<IPTItem> = [];

    public get itemsSubj(): BehaviorSubject<Array<IPTItem>> {
        return this._itemsSubj;
    }

    public get items(): Array<IPTItem> {
        return this._genetatedItems;
    }

    public get ptItemsObs(): Observable<Array<IPTItem>> {
        return this._itemsObs;
        /*
        return Observable.create((observer: Observer<Array<IPTItem>>) => {
            this._observer = observer;

            
                        this.userService.usersObs.subscribe((users: Array<IUser>) => {
                            console.log('subscribe to users');
                            let items = this.mockDataService.generatePTItems(users);
                            observer.next(items);
                        });
                        
        });
        */
    }

    constructor(private mockDataService: MockDataService,
        private userService: UserService,
        private zone: NgZone) {
        this._genetatedItems = this.mockDataService.generatePTItems(this.userService.users);

        this._itemsSubj = new BehaviorSubject([]);
        _.forEach(this._genetatedItems, (item) => {
            this._allItems.push(item);
        });
        this.publishUpdates();


        this._itemsObs = Observable.create((observer: Observer<Array<IPTItem>>) => {
            this._observer = observer;
            observer.next(this._allItems);
            /*
                        this.userService.usersObs.subscribe((users: Array<IUser>) => {
                            console.log('subscribe to users');
                            let items = this.mockDataService.generatePTItems(users);
                            observer.next(items);
                        });
                        */
        });

    }


    public getItem(id: string) {
        let selectedItem = _.find(this._allItems, i => i.id == id);
        return Promise.resolve(selectedItem);
    }


    public addItem(newItem: IPTItem) {
        this._allItems.unshift(newItem);
        this._observer.next(this._allItems);
        //this._genetatedItems.push(newItem);
        //this._itemsSubj.next(newItem);

        this.publishUpdates();
    }

    public loadBacklogItems() {

    }

    public incrementEstimate(item: IPTItem) {
        item.estimate++;
        this.publishUpdates();
    }

    private publishUpdates() {
        // Make sure all updates are published inside NgZone so that change detection is triggered if needed
        this.zone.run(() => {
            // must emit a *new* value (immutability!)
            this.itemsSubj.next([...this._allItems]);
        });
    }
}