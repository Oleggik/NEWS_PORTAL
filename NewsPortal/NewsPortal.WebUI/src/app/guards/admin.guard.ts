import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

import { HttpAuthService } from "../services/http.auth.service"

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private httpAuthService: HttpAuthService, private router: Router) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (await this.httpAuthService.IsInRole("admin")) {

            return true;
        } else {

            this.router.navigate(['']);
        }      

        return false;
    }
}