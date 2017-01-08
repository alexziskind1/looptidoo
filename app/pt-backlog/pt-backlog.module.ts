//angular imports
import { NgModule } from "@angular/core";

//nativescript imports
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

//app imports
import { BacklogService } from '../services/backlog.service';
import { MockDataService } from '../services/mock-data.service';
import { backlogRoutingConfig } from "./pt-backlog-routing.module";
import { PTBacklogComponent } from './pt-backlog.component';
import { PTItemListComponent } from './pt-item-list/pt-item-list.component';
import { PTItemComponent } from './pt-item/pt-item.component';
import { PTItemModule } from './pt-item/pt-item.module';
import { AddItemModalComponent } from './shared/add-item-modal.component';
//import { TypeDisplayPipe, PriorityClassPipe, PriorityDisplayPipe, TypeImagePipe } from './shared/pipes';
import { PipeModule } from './pipes/pipe.module';


@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        backlogRoutingConfig,
        PTItemModule,
        PipeModule
    ],
    declarations: [
        PTBacklogComponent,
        PTItemListComponent,
        PTItemComponent,
        AddItemModalComponent
        //TypeDisplayPipe, PriorityClassPipe, PriorityDisplayPipe, TypeImagePipe
    ],
    entryComponents: [
        AddItemModalComponent
    ],
    providers: [
        BacklogService,
        MockDataService
    ]
})
export class PTBacklogModule { }
