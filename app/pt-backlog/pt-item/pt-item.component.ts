//angular imports
import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

//nativescript imports

//3rd party imports
import 'rxjs/add/operator/switchMap';

//app imports
import { BacklogService, AuthenticationService } from '../../services';
import { PTDomain } from '../../typings/domain';
import IPTItem = PTDomain.IPTItem;


@Component({
    moduleId: module.id,
    selector: 'pt-item',
    templateUrl: 'pt-item.component.html'
})
export class PTItemComponent {

    public item: IPTItem;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private backlogService: BacklogService) {

    }

    ngOnInit() {
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.backlogService.getItem(params['id']))
            .subscribe((item: IPTItem) => this.item = item);
    }

    public changeMeTapped() {
        //this.item.estimate++;
        this.backlogService.incrementEstimate(this.item);
    }
}

