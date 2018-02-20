import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { HttpAuthService } from './services/http.auth.service';

import { CurrentUser } from './models/CurrentUser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [HttpAuthService]
})

export class AppComponent {

    public currentUser: CurrentUser = new CurrentUser();

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private httpAuthService: HttpAuthService
    ) { }

    public async logout() {
        await this.httpAuthService.Logout();
        this.checkCurrentAuthUser();
        this.router.navigate(['']);
    }

    private async checkCurrentAuthUser() {

        this.currentUser.userAuntificated = await this.httpAuthService.IsAuntificated();
        this.currentUser.isAdmin = await this.httpAuthService.IsInRole("admin");
    }

    ngOnInit() {

        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {

                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe(async (event) => {

                this.checkCurrentAuthUser();
                this.titleService.setTitle(event['title'])
            });
    }
}