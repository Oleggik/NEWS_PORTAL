import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

import { HttpAuthService } from "../services/http.auth.service"

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private httpAuthService: HttpAuthService, private router: Router) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (await this.httpAuthService.IsAuntificated()) {

            this.router.navigate(['']);
        } else {

            return true;
        }  

        return false;
    }
}