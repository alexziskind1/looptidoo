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

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        backlogRoutingConfig
    ],
    declarations: [
        PTBacklogComponent,
        PTItemListComponent,
        PTItemComponent
    ],
    providers: [
        BacklogService,
        MockDataService
    ]
})
export class PTBacklogModule { }
