import { ViewChild, Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { HttpNewsService } from '../../services/http.news.service';
import { HttpAuthService } from '../../services/http.auth.service';
import { FullNews } from "../../models/FullNews";

@Component({
    selector: 'create-news-app',
    templateUrl: './viewnews.component.html'
})

export class ViewNewsComponent implements OnInit {

    @ViewChild('div') div: ElementRef;

    public newsId: string;
    private subscription: Subscription;

    public news: FullNews = new FullNews();

    async ngOnInit() {

        let newsFromServer = (await this.httpNewsService.getNewsById(this.newsId));
        if (newsFromServer.length == 0) {

            this.router.navigate(['notfound']);
        }
        else {

            if (!(this.httpAuthService.IsInRole("admin")) && newsFromServer.Published == false) {

                this.router.navigate(['notfound']);
            }
            else {

                this.news = newsFromServer;
                this.news.Body = this.news.Body.replace('\\', '');
                this.div.nativeElement.innerHTML = this.news.Body;
            }
        }
    }

    public constructor(
        private httpNewsService: HttpNewsService,
        private httpAuthService: HttpAuthService,
        private activateRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.subscription = activateRoute.params.subscribe(params => this.newsId = params['newsId']);
    }
}