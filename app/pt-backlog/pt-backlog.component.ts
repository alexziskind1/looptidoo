//angular imports
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ViewContainerRef, ChangeDetectionStrategy } from "@angular/core";

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

//app imports
import { BacklogService, AuthenticationService } from '../services';
import { AddItemModalComponent } from "./shared/add-item-modal.component";
import { PtNewItem, PtItem } from '../shared/models/domain-models';
import { Store } from "../shared/store";
import { PtBacklogService } from "../services/ptbacklog.service";
import { ViewIndex } from "../shared/models/state";

@Component({
    moduleId: module.id,
    selector: 'pt-backlog',
    templateUrl: 'pt-backlog.component.html',
    styleUrls: ['pt-backlog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PTBacklogComponent implements OnInit, AfterViewInit, OnDestroy {

    private _sideDrawerTransition: DrawerTransitionBase = new SlideInOnTopTransition();
    private _drawer: SideDrawerType;

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

    //public selectedViewIndex: number;
    public selectedViewIndex$: Observable<number> = this.store.select<number>('selectedViewIndex');



    public myItemsClass$ = this.selectedViewIndex$
        .map(selectedViewIndex => selectedViewIndex === 0 ? 'slide-out-btn' : 'slide-out-btn-selected');
    public openItemsClass$ = this.selectedViewIndex$
        .map(selectedViewIndex => selectedViewIndex === 1 ? 'slide-out-btn' : 'slide-out-btn-selected');
    public finishedItemsClass$ = this.selectedViewIndex$
        .map(selectedViewIndex => selectedViewIndex === 2 ? 'slide-out-btn' : 'slide-out-btn-selected');

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
        //this.selectedViewIndex = 1;
    }

    public ngOnInit() {
        this.items$ = this.store.select<PtItem[]>('backlogItems');
        this.selectedViewIndex$.subscribe(next => {
            console.log('selectedIndex: ' + next);
            this.ptBacklogService.fetchItems();
        });
        this.blSub = this.ptBacklogService.getBacklog$.subscribe();
        //this.ptBacklogService.fetchItems();
    }

    public ngOnDestroy() {
        this.blSub.unsubscribe();
    }

    public ngAfterViewInit() {
        this._drawer = this.drawerComponent.sideDrawer;
        this._drawer.drawerLocation = SideDrawerLocation.Right;
    }

    public showSlideout() {
        this._drawer.showDrawer();
    }

    public selectFilteredView(itemFilterIndex: number, pageTitle: string) {
        //this.selectedViewIndex = itemFilterIndex;
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

    public logoutTap() {
        this.authService.logout();
        this.router.navigate(["/login"], { clearHistory: true });
    }
}

