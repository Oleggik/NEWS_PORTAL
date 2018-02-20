import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CompleterService, CompleterData } from 'ng2-completer';
import { IMyDpOptions } from 'mydatepicker';

import { CreateNews } from '../../../models/CreateNews'

import { HttpNewsService } from '../../../services/http.news.service';
import { HttpCategoryService } from '../../../services/http.category.service';

import { CreateNewsComponentModel } from "app/models/components/createnews";

import { ParsingErrorResponse } from '../../../helpers/ParserErrorResponse';
import { ModelErrors } from "app/models/ModelsError";

@Component({
    selector: 'create-news-app',
    templateUrl: './createnews.component.html',
    providers: [HttpCategoryService, HttpNewsService]
})

export class CreateNewsComponent implements OnInit {

    public componentModel: CreateNewsComponentModel = new CreateNewsComponentModel();

    constructor(
        private httpCategoryService: HttpCategoryService,
        private httpNewsService: HttpNewsService,
        private router: Router,
        private completerService: CompleterService
    ) { }

    private myDatePickerOptions: IMyDpOptions = {

        dateFormat: 'mm.dd.yyyy',
    };

    public optionsFroalaEditor: Object = {

        placeholderText: 'Please input body for news!',
        heightMin: 250,
        imageUploadURL: '/api/file/upload'
    };

    protected dataService: CompleterData;

    async ngOnInit() {

        this.componentModel.categories = await this.httpCategoryService.GetActiveCategory();
    }

    public async createNews(news: CreateNews) {

        this.componentModel.validateNews.errors.errorsGlobalNews = new Array<ModelErrors>();
        this.componentModel.validateNews.errors.errorsForBody = new Array<ModelErrors>();
        this.componentModel.validateNews.errors.errorsForCategory = new Array<ModelErrors>();
        this.componentModel.validateNews.errors.errorsForDate = new Array<ModelErrors>();
        this.componentModel.validateNews.errors.errorsForTitle = new Array<ModelErrors>();
        this.componentModel.validateNews.errors.errorsForDescription = new Array<ModelErrors>();

        this.componentModel.validateNews.validateBody(news.Body);
        this.componentModel.validateNews.validateCategory(news.CategoryId);
        this.componentModel.validateNews.validateDate(news.CreatedDate);
        this.componentModel.validateNews.validateTitle(news.Title);
        this.componentModel.validateNews.validateDescription(news.Description);

        if (this.componentModel.validateNews.validBody && this.componentModel.validateNews.validChooseCategory
            && this.componentModel.validateNews.validDate && this.componentModel.validateNews.validTitle
            && this.componentModel.validateNews.validDescription) {

            this.componentModel.creatingItem = true;
            
            try {

                news.CreatedDate = news.CreatedDate.formatted;

            } catch (ex) {

                news.CreatedDate = new Date();
            }

            news.Published = news.Published ? true : false;
            const response = await this.httpNewsService.CreatedNews(news);

            if (response.status == 200) {

                this.componentModel.createdNews = new CreateNews();
                this.router.navigate(['/view/news/' + response.json().Id]);

            } else if (response.status == 400) {

                const data = response.json();

                this.componentModel.validateNews.errors = ParsingErrorResponse.parsingCreatedNewsResponse(data);
            }

            this.componentModel.creatingItem = false;
        }
    }
}