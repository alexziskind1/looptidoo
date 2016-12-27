//angular imports
import { Component, OnInit } from "@angular/core";

//nativescript imports
import { RouterExtensions } from 'nativescript-angular/router';
import { ItemEventData, ListView } from 'ui/list-view';

//3rd party imports
import * as _ from 'lodash';

//app imports
import { BacklogService, AuthenticationService } from '../../services';
import { ItemTypeEnum, PriorityEnum, StatusEnum } from '../../shared/static-data';
import { PTDomain } from '../../typings/domain';
import IPTItem = PTDomain.IPTItem;
//import IItemType = PTDomain.IItemType;
//import IPriority = PTDomain.IPriority;

@Component({
    moduleId: module.id,
    selector: 'pt-item-list',
    templateUrl: 'pt-item-list.component.html'
})
export class PTItemListComponent implements OnInit {
    public ptItems: IPTItem[] = [];

    public get ptItemsArray() {
        return this.backlogService.items;
    }

    public get ptItemsArrayObs() {
        return this.backlogService.ptItemsObs;
    }

    public get ptItemsSubj() {
        return this.backlogService.itemsSubj;
    }

    constructor(private backlogService: BacklogService,
        private authService: AuthenticationService,
        private _routerExtensions: RouterExtensions) {
        this.backlogService.ptItemsObs.subscribe(data => {
            console.log('data returned');
            console.dir(data);
            this.ptItems = data;
        });
    }

    public ngOnInit() {

    }



    public addItem() {
        let newItem: IPTItem = {
            id: '',
            title: 'new item',
            description: 'new item desc',
            type: ItemTypeEnum.Bug,
            estimate: 4,
            priority: PriorityEnum.High,
            status: StatusEnum.Open,
            assignee: this.authService.currentUser,
            tasks: [],
            comments: [],
            dateCreated: new Date(),
            dateModified: new Date()
        };
        this.backlogService.addItem(newItem);
    }

    public listItemTap(args: ItemEventData) {
        let lv = <ListView>args.object;
        let item = <IPTItem>lv.items[args.index];
        console.log('list item tap: ' + item.title);

        this._routerExtensions.navigate(['/pt-item', item.id]);

        //this._routerExtensions.navigate()
    }

    public changeMeTapped(item: IPTItem) {
        console.log(item.title);
        this.backlogService.incrementEstimate(item);
    }

}

