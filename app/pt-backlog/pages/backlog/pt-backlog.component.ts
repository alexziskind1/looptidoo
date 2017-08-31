//angular imports
import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, ChangeDetectionStrategy } from "@angular/core";

//third party imports
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

//nativescript imports
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { DrawerTransitionBase, SideDrawerLocation, SlideInOnTopTransition } from 'nativescript-telerik-ui/sidedrawer';
import { RouterExtensions } from 'nativescript-angular/router';
import { Label } from 'ui/label';
import { LayoutBase } from "ui/layouts/layout-base";

//app imports
import { BacklogService, AuthenticationService } from '../../../services';
import { AddItemModalComponent } from "../../shared/add-item-modal.component";
import { PtNewItem, PtItem } from '../../../shared/models/domain-models';
import { Store } from "../../../shared/store";
import { PtBacklogService } from "../../../services/ptbacklog.service";
import { ViewIndex } from "../../../shared/models/ui-models";
import { NavigationOptions } from "nativescript-angular/router/ns-location-strategy";
import { NavigationTransition } from "tns-core-modules/ui/frame";


@Component({
    moduleId: module.id,
    selector: 'pt-backlog',
    templateUrl: 'pt-backlog.component.html',
    styleUrls: ['pt-backlog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PTBacklogComponent implements OnInit, AfterViewInit {

    private _sideDrawerTransition: DrawerTransitionBase = new SlideInOnTopTransition();
    private _drawer: SideDrawerType;

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

    public selectedViewIndex$: Observable<number> = this.store.select<number>('selectedViewIndex');

    public get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    public items$: Observable<PtItem[]>;
    public blSub: Subscription;

    constructor(private router: RouterExtensions,
        private store: Store,
        private ptBacklogService: PtBacklogService,
        private backlogService: BacklogService,
        private authService: AuthenticationService,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef) {
    }

    public ngOnInit() {
        this.items$ = this.store.select<PtItem[]>('backlogItems');
        this.selectedViewIndex$.subscribe(next => {
            this.ptBacklogService.fetchItems();
        });
    }

    public ngAfterViewInit() {
        this._drawer = this.drawerComponent.sideDrawer;
        this._drawer.drawerLocation = SideDrawerLocation.Right;
    }

    public showSlideout() {
        const mainContentLayout = (<LayoutBase>this._drawer.mainContent);
        mainContentLayout.className = 'drawer-content-in';
        this._drawer.showDrawer();
    }

    public onDrawerClosing(args) {
        const mainContentLayout = (<LayoutBase>this._drawer.mainContent);
        mainContentLayout.className = 'drawer-content-out';
    }

    public selectFilteredView(itemFilterIndex: number, pageTitle: string) {
        this.store.set<ViewIndex>('selectedViewIndex', { idx: itemFilterIndex });
        this._drawer.closeDrawer();
    }

    public showAddItemModal() {
        const options: ModalDialogOptions = {
            context: { promptMsg: "Add item" },
            fullscreen: true,
            viewContainerRef: this.vcRef
        };

        this.modalService.showModal(AddItemModalComponent, options).then((newItem: PtNewItem) => {
            if (newItem != null) {
                this.backlogService.addNewPTItem(newItem);
            }
        });
    }

    public onAddTap() {
        var t: NavigationTransition = {
            duration: 2000,
            name: 'slideTop'
        };
        var options: NavigationOptions = {
            transition: t
        };
        this.router.navigate(["/pt-add-item"], options);
    }

    public logoutTap() {
        this.authService.logout();
        this.router.navigate(["/login"], { clearHistory: true });
    }
}

