//angular imports
import { Injectable, OnInit, NgZone } from '@angular/core';
import { Observable, Observer, BehaviorSubject } from "rxjs/Rx";

//3rd party imports
import * as _ from 'lodash';

//app imports
import { AuthenticationService, UserService } from './';
import { MockDataService } from './mock-data.service';
import { FilterState } from '../shared/filter-state.model';
import { PtItem, PtNewItem, PtUser, PtTask, PtNewTask, PtNewComment, PtComment } from '../shared/models/domain-models';
import { PriorityEnum, StatusEnum, ItemTypeEnum } from '../shared/models/domain-enums';
import { Store } from "../shared/store";


@Injectable()
export class BacklogService {

    private _genetatedItems: Array<PtItem> = [];
    private _itemsObs: Observable<Array<PtItem>>;
    private _itemsSubj: BehaviorSubject<Array<PtItem>>;
    private _observer: Observer<Array<PtItem>>;
    private _filterState: FilterState;
    private _allItems: Array<PtItem> = [];
    private _filteredItems: Array<PtItem> = [];

    public get itemsSubj(): BehaviorSubject<Array<PtItem>> {
        return this._itemsSubj;
    }

    public get items(): Array<PtItem> {
        return this._genetatedItems;
    }

    public get ptItemsObs(): Observable<Array<PtItem>> {
        return this._itemsObs;
    }

    constructor(
        private store: Store,
        private mockDataService: MockDataService,
        private userService: UserService,
        private authService: AuthenticationService,
        private zone: NgZone) {
        this._genetatedItems = this.mockDataService.generatePTItems(this.userService.users);

        this._itemsSubj = new BehaviorSubject([]);
        _.forEach(this._genetatedItems, (item) => {
            this._allItems.push(item);
        });

        this._filterState = { filterViewIndex: 0 };

        this.publishUpdates();


        this._itemsObs = Observable.create((observer: Observer<Array<PtItem>>) => {
            this._observer = observer;
            observer.next(this._allItems);
        });
    }


    public getItem(id: string) {
        let selectedItem = _.find(this._allItems, i => i.id == id);
        return Promise.resolve(selectedItem);
    }

    public addNewPTItem(newItem: PtNewItem) {
        let item: PtItem = {
            id: _.uniqueId(),
            title: newItem.title,
            description: newItem.description,
            type: newItem.type,
            estimate: 0,
            priority: PriorityEnum.Medium,
            status: StatusEnum.Open,
            assignee: this.store.value.currentUser,
            tasks: [],
            comments: [],
            dateCreated: new Date(),
            dateModified: new Date()
        };
        this.addItem(item);
    }

    public addItem(item: PtItem) {
        this._allItems.unshift(item);
        this._observer.next(this._allItems);
        this.publishUpdates();
    }

    public deleteItem(item: PtItem) {
        _.remove(this._allItems, (ptitem) => ptitem.id === item.id);
        this.publishUpdates();
    }

    public toggleTask(item: PtItem, task: PtTask) {
        var index = _.indexOf(item.tasks, task);
        task.completed = !task.completed;
        item.tasks.splice(index, 1, task);
    }

    public updateTask(item: PtItem, task: PtTask, newTitle: string) {
        var index = _.indexOf(item.tasks, task);
        task.title = newTitle;
        item.tasks.splice(index, 1, task);
    }

    public addTask(item: PtItem, newTask: PtNewTask) {
        var task: PtTask = {
            id: _.uniqueId(),
            title: newTask.title,
            completed: newTask.completed,
            dateCreated: new Date(),
            dateModified: new Date()
        };
        item.tasks.unshift(task);
    }

    public addComment(item: PtItem, newComment: PtNewComment) {
        var comment: PtComment = {
            id: _.uniqueId(),
            title: newComment.title,
            user: _.find(this.userService.users, (user) => user.id === newComment.userId),
            dateCreated: new Date(),
            dateModified: new Date()
        };
        item.comments.unshift(comment);
    }

    public updatePtItem(item: PtItem) {
        this.publishUpdates();
    }

    public updatePtItemEstimate(item: PtItem, incdec: boolean) {
        if (item.estimate === 0 && !incdec) return;
        item.estimate = incdec ? item.estimate + 1 : item.estimate - 1;
        this.publishUpdates();
    }

    public updatePtItemPriority(item: PtItem, incdec: boolean) {
        if (PriorityEnum.isMax(item.priority) && incdec) return;
        if (PriorityEnum.isMin(item.priority) && !incdec) return;

        if (incdec) {
            item.priority = PriorityEnum.nextPriority(item.priority);
        } else {
            item.priority = PriorityEnum.previousPriority(item.priority);
        }
        this.publishUpdates();
    }

    public updatePtItemType(item: PtItem, newType: ItemTypeEnum) {
        item.type = newType;
        this.publishUpdates();
    }

    public updatePtItemAssignee(item: PtItem, user: PtUser) {
        item.assignee = user;
        this.publishUpdates();
    }

    public updatePtItemStatus(item: PtItem, newStatusStr: string) {
        let newStatus = StatusEnum[newStatusStr];
        if (item.status != newStatus) {
            item.status = newStatus;
            this.publishUpdates();
        }
    }

    public switchAssignee(item: PtItem) {
        let ranUser = _.sample<PtUser>(this.userService.users);
        item.assignee = ranUser;
        this.publishUpdates();
    }

    public filter(filterState: FilterState) {
        this._filterState = filterState;
        this.publishUpdates();
    }

    private publishUpdates() {
        var filteredItems = [];
        switch (this._filterState.filterViewIndex) {
            case 0:
                filteredItems = this._allItems.filter(i => i.assignee.id === this.store.value.currentUser.id);
                break;
            case 1:
                filteredItems = this._allItems.filter(i => i.status === StatusEnum.Open || i.status === StatusEnum.ReOpened);
                break;
            case 2:
                filteredItems = this._allItems.filter(i => i.status === StatusEnum.Closed);
                break;
            default:
                filteredItems = this._allItems;
        }

        // Make sure all updates are published inside NgZone so that change detection is triggered if needed
        this.zone.run(() => {
            // must emit a *new* value (immutability!)
            this.itemsSubj.next([...filteredItems]);
        });
    }
}