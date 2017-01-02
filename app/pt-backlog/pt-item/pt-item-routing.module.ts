//angular imports
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PTItemDetailsComponent } from './pt-item-details.component';
import { PTItemTasksComponent } from './pt-item-tasks.component';
import { PTItemChitchatComponent } from './pt-item-chitchat.component';

const ptItemRoutes: Routes = [

];
export const ptItemRoutingConfig: ModuleWithProviders = RouterModule.forChild(ptItemRoutes);