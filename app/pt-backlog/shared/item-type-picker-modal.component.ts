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


@Component({
    moduleId: module.id,
    selector: 'item-type-picker-modal',
    templateUrl: 'item-type-picker-modal.component.html'
})
export class ItemTypePickerModalComponent implements OnInit {
    @Input() public prompt: string;

    public items: DisplayItem[];

    constructor(private params: ModalDialogParams, private userService: UserService) {
        this.prompt = params.context.promptMsg;
    }

    public close() {
        this.params.closeCallback(null);
    }

    ngOnInit() {
        let theItems: DisplayItem[] = [];

        let keys = [];
        for (var enumMember in ItemTypeEnum) {
            let intVal = parseInt(enumMember, 10);
            var isValueProperty = intVal >= 0;
            if (isValueProperty) {
                theItems.push({ value: enumMember, title: ItemTypeEnum[enumMember], img: ItemTypeEnum.getImage(intVal) });
            }
        }
        this.items = theItems;
    }

    public typeSelect(args: any) {
        this.params.closeCallback(ItemTypeEnum[args.value]);
    }
}

interface DisplayItem {
    title: string;
    value: string;
    img: string;
}