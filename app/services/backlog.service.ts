//angular imports
import { Injectable, OnInit, NgZone } from '@angular/core';
import { Observable, Observer, BehaviorSubject } from "rxjs/Rx";

//3rd party imports
import * as _ from 'lodash';

//app imports
import { UserService } from './user.service';
import { MockDataService } from './mock-data.service';
import { PTDomain } from '../typings/domain';
import { ItemTypeEnum, PriorityEnum, StatusEnum } from '../shared/static-data';
import IUser = PTDomain.IUser;
import IPTItem = PTDomain.IPTItem;
import ITask = PTDomain.ITask;
import IComment = PTDomain.IComment;
import INewTask = PTDomain.INewTask;
import INewComment = PTDomain.INewComment;


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

    //public loadBacklogItems() {}

    public toggleTask(item: IPTItem, task: ITask) {
        var index = _.indexOf(item.tasks, task);
        task.completed = !task.completed;
        item.tasks.splice(index, 1, task);
    }

    public updateTask(item: IPTItem, task: ITask, newTitle: string) {
        var index = _.indexOf(item.tasks, task);
        task.title = newTitle;
        item.tasks.splice(index, 1, task);
    }

    public addTask(item: IPTItem, newTask: INewTask) {
        var task: ITask = {
            id: _.uniqueId(),
            title: newTask.title,
            completed: newTask.completed,
            dateCreated: new Date(),
            dateModified: new Date()
        };
        item.tasks.unshift(task);
    }

    public addComment(item: IPTItem, newComment: INewComment) {
        var comment: IComment = {
            id: _.uniqueId(),
            title: newComment.title,
            user: _.find(this.userService.users, (user) => user.id === newComment.userId),
            dateCreated: new Date(),
            dateModified: new Date()
        };
        item.comments.unshift(comment);
    }

    public updatePtItem(item: IPTItem) {
        this.publishUpdates();
    }

    public updatePtItemEstimate(item: IPTItem, incdec: boolean) {
        if (item.estimate === 0 && !incdec) return;
        item.estimate = incdec ? item.estimate + 1 : item.estimate - 1;
        this.publishUpdates();
    }

    public updatePtItemPriority(item: IPTItem, incdec: boolean) {
        if (PriorityEnum.isMax(item.priority) && incdec) return;
        if (PriorityEnum.isMin(item.priority) && !incdec) return;

        if (incdec) {
            item.priority = PriorityEnum.nextPriority(item.priority);
        } else {
            item.priority = PriorityEnum.previousPriority(item.priority);
        }
        this.publishUpdates();
    }

    public updatePtItemType(item: IPTItem, newType: ItemTypeEnum) {
        item.type = newType;
        this.publishUpdates();
    }

    public updatePtItemAssignee(item: IPTItem, user: IUser) {
        item.assignee = user;
        this.publishUpdates();
    }

    public incrementEstimate(item: IPTItem) {
        item.estimate++;
        this.publishUpdates();
    }

    public switchAssignee(item: IPTItem) {
        let ranUser = _.sample<IUser>(this.userService.users);
        item.assignee = ranUser;
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