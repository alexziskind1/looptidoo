import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { PTBacklogComponent } from "./pages/backlog/pt-backlog.component";
import { PTItemComponent } from "./pt-item/pt-item.component";
import { PTItemDetailsComponent } from "./pt-item/pt-item-details.component";
import { PTItemTasksComponent } from "./pt-item/pt-item-tasks.component";
import { PTItemChitchatComponent } from "./pt-item/pt-item-chitchat.component";
import { AddItemComponent } from "./pages/add-item/add-item.component";

import { AuthGuard } from '../services/auth-guard.service';


import { PtBacklog2Component } from "./pt-backlog2.component";
import { PtBlComponent } from "./pt-bl.component";
import { PtBlAddComponent } from "./pt-bl-add.component";


const backlogRoutes: Routes = [
    {
        path: "pt-backlog",
        component: PtBacklog2Component,
        //canActivate: [AuthGuard],
        children: [
            {
                path: "",
                redirectTo: "pt-bl",
                pathMatch: "full"
            },
            {
                path: "pt-bl",
                component: PtBlComponent
            },
            {
                path: "pt-bl-add",
                component: PtBlAddComponent
            }
        ]
    },
    {
        path: "pt-item/:id",
        component: PTItemComponent,
        children: [
            {
                path: "",
                redirectTo: "pt-item-details",
                pathMatch: "full"
            },
            {
                path: "pt-item-details",
                component: PTItemDetailsComponent
            },
            {
                path: "pt-item-tasks",
                component: PTItemTasksComponent
            },
            {
                path: "pt-item-chitchat",
                component: PTItemChitchatComponent
            }
        ]
    },
    {
        path: "pt-add-item",
        component: AddItemComponent,
    }
];


@NgModule({
    imports: [RouterModule.forChild(backlogRoutes)],
    exports: [RouterModule]
})
export class BacklogRoutingModule { }
