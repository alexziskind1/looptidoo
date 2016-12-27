//angular imports
import { ModuleWithProviders } from "@angular/core";
import { Routes } from '@angular/router';

//nativescript imports
import { NativeScriptRouterModule } from "nativescript-angular/router";

//app imports
import { AuthGuard } from "./services/auth-guard.service";

export const authProviders = [
    AuthGuard
];

const appRoutes: Routes = [
    { path: '', redirectTo: '/pt-backlog', pathMatch: 'full' }
];

export const appRoutingConfig: ModuleWithProviders = NativeScriptRouterModule.forRoot(appRoutes);
