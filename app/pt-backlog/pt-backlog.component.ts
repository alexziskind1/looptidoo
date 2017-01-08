//angular imports
import { Component, ViewContainerRef } from "@angular/core";

//nativescript imports
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';

//app imports
import { BacklogService, AuthenticationService } from '../services';
//import { ItemTypeEnum, PriorityEnum, StatusEnum } from '../shared/static-data';
import { AddItemModalComponent } from "./shared/add-item-modal.component";
import { PTDomain } from '../typings/domain';
import INewItem = PTDomain.INewItem;


@Component({
    moduleId: module.id,
    selector: 'pt-backlog',
    templateUrl: 'pt-backlog.component.html'
})
export class PTBacklogComponent {

    constructor(private backlogService: BacklogService,
        private authService: AuthenticationService,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef) { }


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

