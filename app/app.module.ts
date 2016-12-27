//angular imports
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

//nativescript imports
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";

//app imports
import { appRoutingConfig, authProviders } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./pt-login/pt-login.module";
import { PTBacklogModule } from "./pt-backlog/pt-backlog.module";
import { UserService, AuthenticationService } from './services';


@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule,
        NativeScriptRouterModule,
        appRoutingConfig,
        LoginModule,
        PTBacklogModule],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [UserService,
        AuthenticationService,
        authProviders]
})
export class AppModule { }
