//angular imports
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from "@angular/http";

//nativescript imports
import { getString, setString } from "application-settings";

//3rd party imports
import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/operator/map'

//app imports
import { APP_SETTINGS_TOKEN } from '../common/constants';
import { PtLoginModel, PtAuthToken, PtUser } from '../shared/models/domain-models';
import { Store } from "../shared/store";
import { usersUrl, authUrl } from "../common/api-access";


@Injectable()
export class AuthenticationService {

    //private get currentUser() {
    //    return this.store.value.currentUser;
    //}

    static isLoggedIn(): boolean {
        return !!getString(APP_SETTINGS_TOKEN);
    }

    static get token(): PtAuthToken {
        const t = getString(APP_SETTINGS_TOKEN);
        return JSON.parse(t);
    }

    static set token(authToken: PtAuthToken) {
        setString(APP_SETTINGS_TOKEN, JSON.stringify(authToken));
    }

    constructor(private store: Store, private http: Http) { }

    register(user: PtLoginModel) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(
            usersUrl,
            JSON.stringify({
                Username: user.username,
                Password: user.password
            }),
            { headers: headers }
        )
            .catch(this.handleErrors);
    }

    login(user: PtLoginModel) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(
            authUrl,
            JSON.stringify({
                username: user.username,
                password: user.password,
                grant_type: 'password'
            }),
            { headers: headers }
        )
            .map(response => response.json())
            .do(data => {
                this.store.set<PtUser>('currentUser', data.user);
                AuthenticationService.token = data.authToken.access_token;
            })
            .catch(this.handleErrors);
    }

    logout() {
        setString(APP_SETTINGS_TOKEN, '');
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}