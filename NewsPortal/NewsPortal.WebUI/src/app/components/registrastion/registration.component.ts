import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterUser } from '../../models/RegistrationModel';

import { HttpAuthService } from '../../services/http.auth.service';

@Component({
    selector: 'not-found-app',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    providers: [HttpAuthService]
})

export class RegistrationComponent {
    public user: RegisterUser = new RegisterUser();
    public error: any[] = [];
    public startRegistration: boolean = false;

    constructor(
        private router: Router,
        private httpAuthService: HttpAuthService
    ) { }

    async submit(user: RegisterUser) {

        this.startRegistration = true;
        const response = await this.httpAuthService.Registration(user);

        if (response.status == 200) {

            this.router.navigate(['/login'])

        } else if (response.status == 400) {

            const data = response.json();
            console.log(JSON.stringify(data));

        } else if (response.status == 404) {

            console.log("sever error");
        }

        this.startRegistration = false;
    }
}