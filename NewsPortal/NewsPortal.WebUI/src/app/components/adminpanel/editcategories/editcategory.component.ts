import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { HttpCategoryService } from '../../../services/http.category.service';

import { ModelErrors } from "app/models/ModelsError";
import { ParsingErrorResponse } from "app/helpers/ParserErrorResponse";
import { ValidatorNews } from "app/helpers/ValidatorNews";

@Component({
    selector: 'create-news-app',
    templateUrl: './editcategory.component.html'
})

export class EditCategoryComponent implements OnInit {

    public validateNews: ValidatorNews = new ValidatorNews();
    private subscription: Subscription;

    public selectedCategory: any = {};
    public errorCreatedCategory: Array<ModelErrors> = new Array<ModelErrors>();
    public startEditing: boolean = false;

    public categoryId: number;

    public constructor(
        private httpCategoryService: HttpCategoryService,
        private activateRoute: ActivatedRoute,
        private router: Router
    ) {

        this.subscription = activateRoute.params.subscribe(params => this.categoryId = params['id']);
    }

    async ngOnInit() {

        this.selectedCategory = await this.httpCategoryService.getCategoryById(this.categoryId);
    }

    public async editCategory(item) {

        this.errorCreatedCategory = new Array<ModelErrors>();

        this.startEditing = true;

        item.Active = item.Active ? true : false;
        const response = await this.httpCategoryService.EditCategory(item);

        if (response.status == 200) {

            this.router.navigate(['adminpanel/manage/categories']);

        } else if (response.status == 400) {

            const data = response.json();
            const tempError = ParsingErrorResponse.parsingCreatedCategoryResponse(data);

            for (let i = 0; i < tempError.length; i++) {

                this.errorCreatedCategory.push(tempError[i]);
            }
        }

        this.startEditing = false;
    }

    public closeEditing() {

        this.router.navigate(['adminpanel/manage/categories']);
    }
}