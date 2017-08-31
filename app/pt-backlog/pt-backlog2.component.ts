import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'backlog2',
    template: `
        <StackLayout style="margin-top: 50;">
            <Label text="top level"></Label>

            <router-outlet></router-outlet>

            <Button text="Add" (tap)="onAddTap($event)"></Button>
            
        </StackLayout>
    `
})

export class PtBacklog2Component implements OnInit {
    constructor(private route: ActivatedRoute,
        private router: Router,
        private routerExtensions: RouterExtensions) { }

    ngOnInit() {
        this.routerExtensions.navigate(['pt-bl'], { relativeTo: this.route });
    }

    public onAddTap(args) {
        this.routerExtensions.navigate(['pt-bl-add'], { relativeTo: this.route });
    }
}