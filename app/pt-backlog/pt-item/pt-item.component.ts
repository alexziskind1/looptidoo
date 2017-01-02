//angular imports
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params, UrlSegment } from '@angular/router';

//nativescript imports
import { RouterExtensions } from 'nativescript-angular/router';
import { SelectedIndexChangedEventData } from 'ui/segmented-bar';

//3rd party imports
import 'rxjs/add/operator/switchMap';

//app imports
import { BacklogService, AuthenticationService } from '../../services';
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
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.backlogService.getItem(params['id']))
            .subscribe((item: IPTItem) => this.item = item);
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

