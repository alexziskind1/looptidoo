import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'pt-bl',
    template: `
        <StackLayout>
            <Label text="pt-bl"></Label>

        </StackLayout>
    `
})

export class PtBlComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}