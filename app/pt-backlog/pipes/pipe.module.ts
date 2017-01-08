//angular imports
import { NgModule } from "@angular/core";

//nativescript imports
import { NativeScriptModule } from "nativescript-angular/platform";

//app imports
import { TypeDisplayPipe, PriorityClassPipe, PriorityDisplayPipe, TypeImagePipe } from './';


@NgModule({
    imports: [
        NativeScriptModule
    ],
    declarations: [
        TypeDisplayPipe,
        TypeImagePipe,
        PriorityDisplayPipe,
        PriorityClassPipe
    ],
    exports: [
        TypeDisplayPipe,
        TypeImagePipe,
        PriorityDisplayPipe,
        PriorityClassPipe
    ]
})
export class PipeModule { }
