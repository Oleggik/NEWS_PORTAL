import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { HttpCategoryService } from '../../../services/http.category.service';
import { HttpNewsService } from '../../../services/http.news.service';

import { ModelErrors } from "app/models/ModelsError";
import { ParsingErrorResponse } from "app/helpers/ParserErrorResponse";
import { ValidatorNews } from "app/helpers/ValidatorNews";

@Component({
    selector: 'create-news-app',
    templateUrl: './editnews.component.html'
})

export class EditNewsComponent implements OnInit {

    public preview: boolean = false;
    public news: any;

    private subscription: Subscription;
    public newsId: number;

    public validateNews: ValidatorNews = new ValidatorNews();
    public startEditing: boolean = false;
    public selectedNews: any = {};
    public categories: any[] = [];

    public constructor(
        private httpCategoryService: HttpCategoryService,
        private httpNewsService: HttpNewsService,
        private activateRoute: ActivatedRoute,
        private elementRef: ElementRef,
        private router: Router
    ) {

        this.subscription = activateRoute.params.subscribe(params => this.newsId = params['id']);
    }

    async ngOnInit() {

        this.selectedNews = await this.httpNewsService.getNewsById(this.newsId);
        this.categories = await this.httpCategoryService.GetActiveCategory();
    }

    public async editNews(item) {

        this.validateNews.errors.errorsGlobalNews = new Array<ModelErrors>();
        this.validateNews.errors.errorsForBody = new Array<ModelErrors>();
        this.validateNews.errors.errorsForCategory = new Array<ModelErrors>();
        this.validateNews.errors.errorsForDate = new Array<ModelErrors>();
        this.validateNews.errors.errorsForTitle = new Array<ModelErrors>();
        this.validateNews.errors.errorsForDescription = new Array<ModelErrors>();

        this.validateNews.validateBody(item.Body);
        this.validateNews.validateCategory(item.CategoryId);
        this.validateNews.validateDate(item.CreatedDate);
        this.validateNews.validateTitle(item.Title);
        this.validateNews.validateDescription(item.Description);

        if (this.validateNews.validBody && this.validateNews.validChooseCategory
            && this.validateNews.validDate
            && this.validateNews.validateDescription) {

            this.startEditing = true;

            if (item.CreatedDate["formatted"]) {

                item.CreatedDate = item.CreatedDate.formatted;

            }

            item.Published = item.Published ? true : false;
            const response = await this.httpNewsService.EditNews(item);

            if (response.status == 200) {

                this.router.navigate(['adminpanel/manage/news']);

            } else if (response.status == 400) {

                const data = response.json();
                this.validateNews.errors = ParsingErrorResponse.parsingCreatedNewsResponse(data);
            }

            this.startEditing = false;
        }
    }

    public closeEditing() {

        this.router.navigate(['adminpanel/manage/news']);
    }

    public previewStart(item) {

        this.news = item;
        this.preview = true;
    }

    public closePreview() {

        this.preview = false;
        this.news = {};
    }
}