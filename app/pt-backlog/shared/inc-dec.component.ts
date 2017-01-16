import { Component, Input, Output, EventEmitter } from "@angular/core";


@Component({
    moduleId: module.id,
    selector: 'inc-dec',
    template: `     <StackLayout orientation="horizontal" class="pm-wrapper">
                        <StackLayout class="{{ decEnabled ? 'pm-left-wrapper' : 'pm-left-wrapper pm-wrapper-disabled' }}">
                        <Button class="{{ decEnabled ? 'pm-left' : 'pm-left pm-disabled' }}" (tap)="decTap()" [isEnabled]="decEnabled">
                            <FormattedString>
                                <Span text="-" fontSize="26" ios:foregroundColor="{{ decEnabled ? 'gray' : 'white' }}" android:foregroundColor="white"></Span>
                            </FormattedString>
                        </Button>
                        </StackLayout>
                        <StackLayout class="{{ incEnabled ? 'pm-right-wrapper' : 'pm-right-wrapper pm-wrapper-disabled' }}">
                        <Button class="{{ incEnabled ? 'pm-right' : 'pm-right pm-disabled' }}" (tap)="incTap()" [isEnabled]="incEnabled">
                            <FormattedString>
                                <Span text="+" fontSize="26" ios:foregroundColor="{{ incEnabled ? 'gray' : 'white' }}" android:foregroundColor="white"></Span>
                            </FormattedString>
                        </Button>
                        </StackLayout>
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

