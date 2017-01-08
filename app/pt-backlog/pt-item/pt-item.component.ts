//angular imports
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params, UrlSegment } from '@angular/router';

//nativescript imports
import { RouterExtensions } from 'nativescript-angular/router';
import { SelectedIndexChangedEventData } from 'ui/segmented-bar';
import { confirm, action, ActionOptions, ConfirmOptions } from 'ui/dialogs';

//3rd party imports
import 'rxjs/add/operator/switchMap';

//app imports
import { BacklogService, AuthenticationService } from '../../services';
import { ItemTypeEnum } from '../../shared/static-data';
import { PTDomain } from '../../typings/domain';
import IPTItem = PTDomain.IPTItem;


@Component({
    moduleId: module.id,
    selector: 'pt-item',
    templateUrl: 'pt-item.component.html'
})
export class PTItemComponent implements OnInit {

    private _selectedItemDetailScreenIndex: number = 0;
    public item: IPTItem;

    public get itemTitle() {
        return this.item ? this.item.title : '';
    }

    public get typeImg() {
        return this.item ? ItemTypeEnum.getImage(this.item.type) : '';
    }

    public get itemDetailScreens() {
        return [
            { title: 'Details', routePath: 'pt-item-details' },
            { title: 'Tasks', routePath: 'pt-item-tasks' },
            { title: 'Chitchat', routePath: 'pt-item-chitchat' }
        ];
    }

    public get selectedItemDetailScreenIndex() {
        return this._selectedItemDetailScreenIndex;
    }
    public set selectedItemDetailScreenIndex(value: number) {
        if (this._selectedItemDetailScreenIndex !== value && value >= 0 && value < this.itemDetailScreens.length) {
            this._selectedItemDetailScreenIndex = value;
            let path = this.itemDetailScreens[this._selectedItemDetailScreenIndex].routePath;
            // Navigate with relative link
            //this._routerExtensions.navigate(['/pt-item', item.id]);
            this.routerExtensions.navigate([path], { relativeTo: this.route });
        }
    }

    constructor(private route: ActivatedRoute,
        private router: Router,
        private routerExtensions: RouterExtensions,
        private backlogService: BacklogService) { }

    public ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.backlogService.getItem(params['id']))
            .subscribe((item: IPTItem) => this.item = item);
    }

    public onActionMenuTap() {
        var options: ActionOptions = {
            title: 'Item Actions',
            cancelButtonText: 'Cancel',
            actions: ['Delete']
        };

        action(options).then((result) => {
            if (result === 'Delete') {
                this.onDelete();
            }
        });
    }

    public onDelete() {
        //Simple approach
        //if (confirm('Are you sure you want to delete this item?')) {

        //}

        //Better approach with promise
        var options: ConfirmOptions = {
            title: "Delete Item",
            message: "Are you sure you want to delete this item?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        };
        //confirm without options, with promise
        confirm('Are you sure you want to delete this item?')
            //confirm with options, with promise
            //confirm(options)
            .then((result: boolean) => {
                // result can be true/false/undefined
                if (result) {
                    this.backlogService.deleteItem(this.item);
                    setTimeout(() => {
                        this.routerExtensions.back();
                    }, 100);
                }
            });
    }

    public selectedItemDetailScreenIndexChanged(args: SelectedIndexChangedEventData) {
        console.log('selectedItemDetailScreenIndexChanged: ' + args.newIndex);
        let newIndex = args.newIndex;
        if (this._selectedItemDetailScreenIndex !== newIndex && newIndex >= 0 && newIndex < this.itemDetailScreens.length) {
            this._selectedItemDetailScreenIndex = newIndex;
            let path = this.itemDetailScreens[this._selectedItemDetailScreenIndex].routePath;
            // Navigate with relative link
            //this._routerExtensions.navigate(['/pt-item', item.id]);
            this.routerExtensions.navigate([path], { relativeTo: this.route });
        }

    }


}

