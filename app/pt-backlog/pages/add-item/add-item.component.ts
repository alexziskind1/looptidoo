import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'add-item',
    template: `
        <StackLayout>
            <Label text="poo"></Label>
        </StackLayout>
    `
})

export class AddItemComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}