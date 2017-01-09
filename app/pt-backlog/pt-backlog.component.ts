//angular imports
import { Component, AfterViewInit, ViewChild, ViewContainerRef } from "@angular/core";

//nativescript imports
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { DrawerTransitionBase, SideDrawerLocation, SlideInOnTopTransition } from 'nativescript-telerik-ui/sidedrawer';

//app imports
import { BacklogService, AuthenticationService } from '../services';
import { AddItemModalComponent } from "./shared/add-item-modal.component";
import { PTDomain } from '../typings/domain';
import INewItem = PTDomain.INewItem;


@Component({
    moduleId: module.id,
    selector: 'pt-backlog',
    templateUrl: 'pt-backlog.component.html'
})
export class PTBacklogComponent implements AfterViewInit {

    private _sideDrawerTransition: DrawerTransitionBase = new SlideInOnTopTransition();
    private _drawer: SideDrawerType;

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

    public get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
        //return this._drawerService.sideDrawerTransition;
    }

    constructor(private backlogService: BacklogService,
        private authService: AuthenticationService,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef) { }

    public ngAfterViewInit() {
        this._drawer = this.drawerComponent.sideDrawer;
        this._drawer.drawerLocation = SideDrawerLocation.Right;
        //this._drawerService.initDrawer(this.drawerComponent.sideDrawer);
    }

    public showSlideout() {
        this._drawer.showDrawer();
    }

    public showAddItemModal() {
        const options: ModalDialogOptions = {
            context: { promptMsg: "Add item" },
            fullscreen: true,
            viewContainerRef: this.vcRef
        };

        this.modalService.showModal(AddItemModalComponent, options).then((newItem: INewItem) => {
            if (newItem != null) {
                this.backlogService.addNewPTItem(newItem, this.authService.currentUser);
            }
        });
    }
}

