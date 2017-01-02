//angular imports
import { Component, Input, OnInit } from "@angular/core";

//nativescript imports
import { Page } from 'ui/page';
import { ModalDialogParams, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { ItemEventData, ListView } from 'ui/list-view';

//app imports
import { UserService } from '../../services';
import { PTDomain } from '../../typings/domain';
import IUser = PTDomain.IUser;

@Component({
    moduleId: module.id,
    selector: 'user-picker-modal',
    templateUrl: 'user-picker-modal.component.html'
})
export class UserPickerModalComponent implements OnInit {
    @Input() public prompt: string;
    constructor(private params: ModalDialogParams, private userService: UserService) {
        this.prompt = params.context.promptMsg;
    }

    public close(res: string) {
        this.params.closeCallback(res);

    }

    ngOnInit() {
        console.log("ModalContent.ngOnInit");
    }

    ngOnDestroy() {
        console.log("ModalContent.ngOnDestroy");
    }

    public listItemTap(args: ItemEventData) {
        let lv = <ListView>args.object;
        let user = <IUser>lv.items[args.index];
        console.log('list item tap: ' + user.fullName);
        this.params.closeCallback(user);

    }
}