//angular imports
import { NgModule } from "@angular/core";

//nativescript imports
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";

//app imports
import { BacklogRoutingModule } from './pt-backlog.routing';
import { BacklogService } from '../services/backlog.service';
import { PTBacklogComponent } from './pages/backlog/pt-backlog.component';
import { PTItemListComponent } from './pt-item-list/pt-item-list.component';
import { PTItemComponent } from './pt-item/pt-item.component';
import { PTItemModule } from './pt-item/pt-item.module';
import { AddItemModalComponent } from './shared/add-item-modal.component';

import { PipesModule } from './pipes/pipes.module';
import { PtBacklogService } from "../services/ptbacklog.service";
import { AddItemComponent } from "./pages/add-item/add-item.component";
import { PtBacklog2Component } from "./pt-backlog2.component";
import { PtBlComponent } from "./pt-bl.component";
import { PtBlAddComponent } from "./pt-bl-add.component";


@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        BacklogRoutingModule,
        PTItemModule,
        PipesModule
    ],
    declarations: [
        PTBacklogComponent,
        PTItemListComponent,
        PTItemComponent,
        AddItemComponent,
        AddItemModalComponent,

        PtBacklog2Component,
        PtBlComponent,
        PtBlAddComponent,

        SIDEDRAWER_DIRECTIVES
    ],
    entryComponents: [
        AddItemModalComponent
    ],
    providers: [
        PtBacklogService,
        BacklogService
    ]
})
export class PTBacklogModule { }
