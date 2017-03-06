//angular imports
import { Component, OnInit, ViewContainerRef } from "@angular/core";

//nativescript imports
import { Page } from 'ui/page';
import { ModalDialogService, ModalDialogParams, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { ItemEventData, ListView } from 'ui/list-view';
import { ItemTypePickerModalComponent } from "../shared/item-type-picker-modal.component";

//app imports
import { UserService } from '../../services';
import { ItemTypeEnum } from '../../shared/static-data';
import { PTDomain } from '../../typings/domain';
import INewItem = PTDomain.INewItem;

import IUser = PTDomain.IUser;

@Component({
    moduleId: module.id,
    selector: 'add-item-modal',
    templateUrl: 'add-item-modal.component.html',
    styles: [`
        .btn-item-add-wrapper {
            vertical-align: middle;
            height: 60;
        }
        .btn-item-add {
            height: 100%;
            background-color: #e4e4e6;
            color: #ffffff;
        }
        .btn-item-add.enabled {
            background-color: #555c95;
            color: #ffffff;
        }
    `]
})
export class AddItemModalComponent implements OnInit {
    public prompt: string;

    public formFieldGridCols = '90, *, 90';
    public newItem: INewItem;

    public get btnDoneEnabled() {
        return this.newItem.title.length > 0;
    }

    constructor(private userService: UserService,
        private params: ModalDialogParams,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef) {
        this.prompt = params.context.promptMsg;
        this.newItem = {
            title: '',
            description: '',
            type: ItemTypeEnum.PBI
        };
    }


    public tapCancel() {
        this.params.closeCallback(null);
    }

    public tapDone() {
        this.params.closeCallback(this.newItem);
    }

    ngOnInit() {

    }

    public textViewFieldHeight(value: string): number {
        if (value) {
            let lineHeight = 20;
            let numlines = Math.ceil(value.length / 36);
            let newHeight = ((numlines < 2 ? 2 : numlines) * lineHeight) + 10;
            return newHeight < 150 ? newHeight : 150;
        }
        else {
            return 40;
        }
    }

    public showTypeModal() {
        const options: ModalDialogOptions = {
            context: { promptMsg: "Select item type" },
            fullscreen: true,
            viewContainerRef: this.vcRef
        };

        this.modalService.showModal(ItemTypePickerModalComponent, options).then((res: ItemTypeEnum) => {
            if (res) {
                this.newItem.type = res;
            }
        });
    }
}