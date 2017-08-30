//angular imports
import { NgModule } from "@angular/core";

//nativescript imports
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

//app imports
import {
    TypeDisplayPipe,
    EstimateDisplayPipe,
    PriorityClassPipe,
    PriorityDisplayPipe,
    TypeImagePipe,
    StatusDisplayPipe,
    SelectedFilterPipe,
    FilterButtonClassPipe
} from './';


@NgModule({
    imports: [
        NativeScriptModule
    ],
    declarations: [
        TypeDisplayPipe,
        TypeImagePipe,
        PriorityDisplayPipe,
        StatusDisplayPipe,
        PriorityClassPipe,
        EstimateDisplayPipe,
        SelectedFilterPipe,
        FilterButtonClassPipe
    ],
    exports: [
        TypeDisplayPipe,
        TypeImagePipe,
        PriorityDisplayPipe,
        StatusDisplayPipe,
        PriorityClassPipe,
        EstimateDisplayPipe,
        SelectedFilterPipe,
        FilterButtonClassPipe
    ]
})
export class PipesModule { }
