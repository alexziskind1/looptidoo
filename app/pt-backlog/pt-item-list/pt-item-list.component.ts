//angular imports
import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from "@angular/core";

//nativescript imports
import { RouterExtensions } from 'nativescript-angular/router';
import { ItemEventData, ListView } from 'ui/list-view';
import { Page } from 'ui/page';

//3rd party imports
import * as _ from 'lodash';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/map';

//app imports
//import { BacklogService, AuthenticationService } from '../../services';
import { FilterState } from '../../shared/filter-state.model';
import { PtItem } from '../../shared/models/domain-models';
import { ItemTypeEnum, StatusEnum } from '../../shared/models/domain-enums';
import { PtBacklogService } from "../../services/ptbacklog.service";
import { Store } from "../../shared/store";


@Component({
    moduleId: module.id,
    selector: 'pt-item-list',
    templateUrl: 'pt-item-list.component.html',
    styleUrls: ['pt-item-list.component.css'],
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class PTItemListComponent implements OnInit, OnDestroy {

    @Input() public selectedViewIndex: number;
    @Input() public items: PtItem[] = [];

    //public shownItems$: Observable<PtItem[]>;
    //public sub: Subscription;

    //public selectedViewIndex$: Observable<number> = this.store.select<number>('selectedViewIndex');

    //private selViewSub: Subscription;

    /*
    public myPtItems$ = this.ptItems$
        .map(items => items.filter(i => i.assignee.id === this.currentUser.id));
        */

    //private get currentUser() {
    //    return this.store.value.currentUser;
    //}

    //public ptItems: PtItem[] = [];
    //private _selectedViewIndex: number;

    /*
    @Input() public get selectedViewIndex() {
        return this._selectedViewIndex;
    }
    public set selectedViewIndex(value: number) {
        this._selectedViewIndex = value;
        this.refresh();
    }
    */

    /*
    public get ptItemsArray() {
        return this.backlogService.items;
    }

    public get ptItemsArrayObs() {
        return this.backlogService.ptItemsObs;
    }

    public get ptItemsSubj() {
        return this.backlogService.itemsSubj;
    }
    */


    public getIndicatorClass(item: PtItem) {
        return ItemTypeEnum.getIndicatorClass(item.type);
    }


    constructor(private page: Page,
        private store: Store,
        private ptBacklogService: PtBacklogService,
        //private backlogService: BacklogService,
        //private authService: AuthenticationService,
        private _routerExtensions: RouterExtensions) {

    }

    public ngOnInit() {

        /*
        this.backlogService.ptItemsObs.subscribe(data => {
            this.ptItems = data;
        });
        */

        /*
        this.selViewSub = this.selectedViewIndex$
            .subscribe(nextVal => {
                if (this.store.value.backlogItems.length > 0) {
                    const filteredItems = this.store.value.backlogItems.filter(i => {
                        switch (nextVal) {
                            case 0:
                                return this.currentUser.id === i.assignee.id;
                            case 1:
                                return i.status === StatusEnum.Open;
                            case 2:
                                return i.status === StatusEnum.Closed;
                            default:
                                return true;
                        }
                    });

                    this.store.set('backlogItems', filteredItems);
                }
            });
            */

        //this.shownItems$ = this.store.select<PtItem[]>('backlogItems');
        //.map(items => items.filter(i => {
        //    return this.currentUser.id === i.assignee.id;
        //}));

        //this.sub = this.ptBacklogService.getBacklog$.subscribe();
    }
    public ngOnDestroy() {
        //this.sub.unsubscribe();
        //this.selViewSub.unsubscribe();
    }

    private refresh() {
        /*
        let filterState: FilterState = new FilterState(
            this.selectedViewIndex);
            */
        //this.backlogService.filter(filterState);
    }

    public listItemTap(args: ItemEventData) {
        let lv = <ListView>args.object;
        let item = <PtItem>lv.items[args.index];
        this._routerExtensions.navigate(['/pt-item', item.id]);
    }

}

