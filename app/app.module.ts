//angular imports
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
//import { HttpModule } from '@angular/http';

//nativescript imports
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptHttpModule } from 'nativescript-angular/http';


//app imports
import { AppRoutingModule, authProviders } from './app.routing';
import { AppComponent } from "./app.component";
import { LoginModule } from "./pt-login/pt-login.module";
import { PTBacklogModule } from "./pt-backlog/pt-backlog.module";
import { UserService, AuthenticationService } from './services';
import { setStatusBarColors } from "./shared/status-bar-util";
import { Store } from './shared/store';

setStatusBarColors();

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        AppRoutingModule,
        LoginModule,
        PTBacklogModule
    ],
    providers: [
        UserService,
        AuthenticationService,
        authProviders,
        Store
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
