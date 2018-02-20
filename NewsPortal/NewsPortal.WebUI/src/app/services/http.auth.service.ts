import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { HttpQueryStrings } from '../helpers/HttpQueryStrings'
import { RegisterUser } from '../models/RegistrationModel'
import { LoginUser } from '../models/LoginModel'

@Injectable()
export class HttpAuthService {

    constructor(
        private http: Http,
        private router: Router
    ) { }

    private options: any = {

        withCredentials: true
    };

    public async IsAuntificated(): Promise<boolean> {

        return (await this.http.get(HttpQueryStrings.IsAuntificated, this.options).toPromise()).json();
    }

    public async IsInRole(roleName: string): Promise<boolean> {

        return (await this.http.get(HttpQueryStrings.UserInRole + roleName, this.options).toPromise()).json();
    }

    public async Logout() {

        await this.http.get(HttpQueryStrings.LogoutUser, this.options).toPromise();
    }

    public async Login(loginUser: LoginUser) {

        let response;
        let responseData: any;
        try {
            response = await this.http.post(HttpQueryStrings.LoginUser, loginUser, this.options).toPromise();
            return response;
        } catch (ex) {
            console.log(JSON.stringify(ex));
            return ex;
        }
    }

    public async Registration(registrationUser: RegisterUser) {

        let response;
        let responseData: any;
        try {
            response = await this.http.post(HttpQueryStrings.RegiserUser, registrationUser, this.options).toPromise();
            return response;
        } catch (ex) {   
            return ex;
        }
    }

    public async logout() {

        await this.http.get(HttpQueryStrings.LogoutUser, this.options);
    }
}