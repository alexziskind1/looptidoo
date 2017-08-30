//angular imports 
import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";

//nativescript imports
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'ui/page';
import { View } from "ui/core/view";
import { Animation } from "ui/animation";
import { Color } from "color";
import { connectionType, getConnectionType } from "connectivity";
import * as enums from 'ui/enums';

//app imports
import { AuthenticationService, UserService } from '../services';
import { DEMO_PASSWORD } from '../shared/constants';
import { PtLoginModel, PtUser } from '../shared/models/domain-models';
import { Store } from "../shared/store";


@Component({
    moduleId: module.id,
    selector: 'pt-login',
    templateUrl: 'pt-login.component.html',
    styleUrls: ['pt-login.component.css']
})
export class LoginComponent implements OnInit {

    public isAuthenticating: boolean = false;
    @ViewChild('loginInputs') loginInputsRef: ElementRef;
    @ViewChild('btnLoginWrapper') btnLoginWrapperRef: ElementRef;
    @ViewChild('btnLogin') btnLoginRef: ElementRef;



    public get loginInputs(): View {
        return this.loginInputsRef.nativeElement;
    }

    public get btnLoginWrapper(): View {
        return this.btnLoginWrapperRef.nativeElement;
    }

    public get btnLogin(): View {
        return this.btnLoginRef.nativeElement;
    }

    public loginModel: PtLoginModel = { username: 'alexziskind', password: DEMO_PASSWORD };

    constructor(private page: Page,
        private router: RouterExtensions,
        private store: Store,
        private authService: AuthenticationService) {

    }

    public ngOnInit() {
        this.page.actionBarHidden = true;
    }

    public login() {
        if (getConnectionType() === connectionType.none) {
            alert('Sorry, an internet connection is required to log in.');
            return;
        }

        this.isAuthenticating = true;
        this.loginInputs.className = '';

        this.loginAnimationForward()
            .then(() => {
                this.authService.login(this.loginModel)
                    .subscribe(() => {
                        this.isAuthenticating = false;
                        this.router.navigate(["/"], { clearHistory: true });
                    },
                    (error) => {
                        this.loginAnimationReverse()
                            .then(() => {
                                this.loginInputs.className = 'login-failed';
                            });
                        this.isAuthenticating = false;
                    });
            });
    }

    private loginAnimationForward() {
        this.btnLogin.opacity = 0;
        return this.btnLoginWrapper.animate({
            scale: { x: 0.5, y: 0.5 },
            duration: 200,
            curve: enums.AnimationCurve.cubicBezier(0, .75, .22, 1)
        }).then(() => {
            this.btnLoginWrapper.animate({
                scale: { x: 20, y: 20 },
                duration: 250,
                curve: enums.AnimationCurve.cubicBezier(.93, .02, 1, .25)
            }).then(() => {
                this.btnLoginWrapper.animate({
                    backgroundColor: new Color('#999999'),
                    duration: 5000,
                    delay: 1000
                });
            });
        });
    }

    private loginAnimationReverse() {
        return this.btnLoginWrapper.animate({
            scale: { x: 1, y: 1 },
            backgroundColor: new Color('#555a97'),
            duration: 200,
            curve: enums.AnimationCurve.cubicBezier(0, .75, .22, 1)
        }).then(() => {
            this.btnLogin.opacity = 1;
        });
    }

}
