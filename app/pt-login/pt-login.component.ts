//angular imports 
import { Component } from "@angular/core";
import { Router } from "@angular/router";

//app imports
import { AuthenticationService, UserService } from '../services';
import { PTDomain } from '../typings/domain';
import ILoginModel = PTDomain.ILoginModel;

@Component({
    moduleId: module.id,
    selector: "pt-login",
    templateUrl: "pt-login.component.html"
})
export class LoginComponent {

    public isLoading: boolean = false;
    public loginModel: ILoginModel = { username: '', password: '' };

    constructor(private router: Router,
        private authService: AuthenticationService,
        private userService: UserService) { }


    public login() {
        this.isLoading = true;
        this.authService.login(this.loginModel.username, this.loginModel.password)
            .subscribe(
            data => {
                this.router.navigate(["/"]);
            },
            error => {
                //this.alertService.error(error);
                this.isLoading = false;
            });
    }
}
