//angular imports
import { Component, Input, OnInit } from "@angular/core";

//nativescript imports
import { Page } from 'ui/page';
import { ModalDialogParams, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { ItemEventData, ListView } from 'ui/list-view';

//app imports
import { UserService } from '../../services';
import { ItemTypeEnum } from '../../shared/static-data';
import { PTDomain } from '../../typings/domain';
import IUser = PTDomain.IUser;


@Component({
    moduleId: module.id,
    selector: 'item-type-picker-modal',
    templateUrl: 'item-type-picker-modal.component.html'
})
export class ItemTypePickerModalComponent implements OnInit {
    @Input() public prompt: string;

    public items: Array<string>;

    constructor(private params: ModalDialogParams, private userService: UserService) {
        this.prompt = params.context.promptMsg;
    }

    public close(res: string) {
        this.params.closeCallback(res);


    }

    ngOnInit() {
        console.log("ModalContent.ngOnInit");

        let keys = [];
        for (var enumMember in ItemTypeEnum) {
            var isValueProperty = parseInt(enumMember, 10) >= 0;
            if (isValueProperty) {
                keys.push({ key: enumMember, value: ItemTypeEnum[enumMember] });
            }
        }
        this.items = keys;
    }

    ngOnDestroy() {
        console.log("ModalContent.ngOnDestroy");
    }

    public typeSelect(args: any) {
        this.params.closeCallback(ItemTypeEnum[args.value]);
    }
}