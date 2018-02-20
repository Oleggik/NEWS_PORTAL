import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginUser } from '../../models/LoginModel';
import { ModelErrors } from '../../models/ModelsError';

import { ParsingErrorResponse } from '../../helpers/ParserErrorResponse';

import { HttpAuthService } from '../../services/http.auth.service';

@Component({
    selector: 'login-app',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [HttpAuthService]
})

export class LoginComponent {

    public user: LoginUser = new LoginUser();
    public error: ModelErrors[] = new Array<ModelErrors>();
    public startLogin: boolean = false;

    public constructor(
        private router: Router, 
        private httpAuthService: HttpAuthService
    ) { }

    public async submit(user: LoginUser) {

        this.error = new Array<ModelErrors>();
        this.startLogin = true;
        const response = await this.httpAuthService.Login(user);

        if (response.status == 200) {

            this.router.navigate([''])

        } else if (response.status == 400) {

            const data = response.json();
            this.error = ParsingErrorResponse.parsingLoginUser(data);

        } else if (response.status == 404) {

            let err = new ModelErrors();
            err.Field = "Auth";
            err.ErrorsMessage.push("Invalid password or email!");

            this.error.push(err);
        }
        this.startLogin = false;
    }
}