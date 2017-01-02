import { Component, Input, Output, EventEmitter } from "@angular/core";


@Component({
    moduleId: module.id,
    selector: 'inc-dec',
    template: `     <StackLayout orientation="horizontal" class="pm-wrapper">
                        <Button text="-" class="{{ decEnabled ? 'pm-left' : 'pm-left pm-disabled' }}" (tap)="decTap()" [isEnabled]="decEnabled"></Button>
                        <Button text="+" class="{{ incEnabled ? 'pm-right' : 'pm-right pm-disabled' }}" (tap)="incTap()" [isEnabled]="incEnabled"></Button>
                    </StackLayout>
                    `,
    styleUrls: ['inc-dec.component.css']
})
export class IncDecComponent {

    @Output() notifyIncDecTapped: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() decEnabled: boolean = true;
    @Input() incEnabled: boolean = true;

    public decTap() {
        this.notifyIncDecTapped.emit(false);
    }

    public incTap() {
        this.notifyIncDecTapped.emit(true);
    }
}

