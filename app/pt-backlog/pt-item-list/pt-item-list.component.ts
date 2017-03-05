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
import { ItemTypeEnum, PriorityEnum, StatusEnum } from '../../shared/static-data';
import { FilterState } from '../../shared/filter-state.model';
import { PTDomain } from '../../typings/domain';
import IPTItem = PTDomain.IPTItem;
//import IItemType = PTDomain.IItemType;
//import IPriority = PTDomain.IPriority;

@Component({
    moduleId: module.id,
    selector: 'pt-item-list',
    templateUrl: 'pt-item-list.component.html',
    styles: [
        `
            .items-list {
                height: 100%;
            }
            .li-wrapper {

            }
            .li-indicator {
                height: 58;
                width: 10;
                text-align: left;
            }
            .li-indicator label {
                width: 5;
                height: 58;
                horizontal-align: left;
            }
            .li-info-wrapper {
                margin-left: 5;
            }
            .li-title {
                font-size: 14;
                color: #4b5833;
            }
            .li-estimate {
                font-size: 10;
                font-weight: bold;
                color: #555a97;
            }
        `
    ]
})
export class PTItemListComponent implements OnInit {
    public ptItems: IPTItem[] = [];
    private _selectedViewIndex: number;

    @Input() public get selectedViewIndex() {
        return this._selectedViewIndex;
    }
    public set selectedViewIndex(value: number) {
        this._selectedViewIndex = value;
        this.refresh();

        //this.hideSearchKeyboard();
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


    public getIndicatorClass(item: IPTItem) {
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
        let item = <IPTItem>lv.items[args.index];
        this._routerExtensions.navigate(['/pt-item', item.id]);
    }

}

