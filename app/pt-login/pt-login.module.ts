import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";

import { LoginComponent } from "./pt-login.component";
import { LoginRoutingModule } from "./pt-login.routing";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule { }