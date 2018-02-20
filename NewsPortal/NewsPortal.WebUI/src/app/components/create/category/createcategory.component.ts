import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CreateCategory } from '../../../models/CreateCategory'

import { HttpCategoryService } from '../../../services/http.category.service';

import { CreateNewsComponentModel } from "app/models/components/createnews";

import { ParsingErrorResponse } from '../../../helpers/ParserErrorResponse';
import { ModelErrors } from "app/models/ModelsError";

@Component({
    selector: 'create-news-app',
    templateUrl: './createcategory.component.html',
    providers: [HttpCategoryService]
})

export class CreateCategoryComponent {

    public componentModel: CreateNewsComponentModel = new CreateNewsComponentModel();

    constructor(
        private httpCategoryService: HttpCategoryService,
        private router: Router
    ) { }
    
    public async createCategory(category: CreateCategory) {

        this.componentModel.errorCreatedCategory = new Array<ModelErrors>();
        this.componentModel.creatingItem = true;

        category.Active = category.Active ? true : false;

        const response = await this.httpCategoryService.CreatedCategory(category);

        if (response.status == 200) {

            this.router.navigate(['adminpanel/create/news'])

        } else if (response.status == 400) {

            const data = response.json();
            const tempError = ParsingErrorResponse.parsingCreatedCategoryResponse(data);

            for (let i = 0; i < tempError.length; i++) {

                this.componentModel.errorCreatedCategory.push(tempError[i]);
            }
        }

        this.componentModel.creatingItem = false;
    }
}