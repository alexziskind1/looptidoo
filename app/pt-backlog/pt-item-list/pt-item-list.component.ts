//angular imports
import { Component, OnInit, Input } from "@angular/core";

//nativescript imports
import { RouterExtensions } from 'nativescript-angular/router';
import { ItemEventData, ListView } from 'ui/list-view';
import { Page } from 'ui/page';

//3rd party imports
import * as _ from 'lodash';

//app imports
import { BacklogService, AuthenticationService } from '../../services';
import { FilterState } from '../../shared/filter-state.model';
import { PtItem } from '../../shared/models/domain-models';
import { ItemTypeEnum } from '../../shared/models/domain-enums';

@Component({
    moduleId: module.id,
    selector: 'pt-item-list',
    templateUrl: 'pt-item-list.component.html',
    styleUrls: ['pt-item-list.component.css']
})
export class PTItemListComponent implements OnInit {
    public ptItems: PtItem[] = [];
    private _selectedViewIndex: number;

    @Input() public get selectedViewIndex() {
        return this._selectedViewIndex;
    }
    public set selectedViewIndex(value: number) {
        this._selectedViewIndex = value;
        this.refresh();
    }

    public get ptItemsArray() {
        return this.backlogService.items;
    }

    public get ptItemsArrayObs() {
        return this.backlogService.ptItemsObs;
    }

    public get ptItemsSubj() {
        return this.backlogService.itemsSubj;
    }


    public getIndicatorClass(item: PtItem) {
        return ItemTypeEnum.getIndicatorClass(item.type);
    }


    constructor(private page: Page,
        private backlogService: BacklogService,
        private authService: AuthenticationService,
        private _routerExtensions: RouterExtensions) {

    }

    public ngOnInit() {
        this.backlogService.ptItemsObs.subscribe(data => {
            this.ptItems = data;
        });
    }

    private refresh() {
        let filterState: FilterState = new FilterState(
            this.selectedViewIndex);
        this.backlogService.filter(filterState);
    }

    public listItemTap(args: ItemEventData) {
        let lv = <ListView>args.object;
        let item = <PtItem>lv.items[args.index];
        this._routerExtensions.navigate(['/pt-item', item.id]);
    }

}

