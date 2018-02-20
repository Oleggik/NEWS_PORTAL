import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { HttpQueryStrings } from '../helpers/HttpQueryStrings'
import { CreateCategory } from '../models/CreateCategory'

@Injectable()
export class HttpCategoryService {

    constructor(
        private http: Http,
        private router: Router
    ) { }
    f
    private options: any = {

        withCredentials: true
    };

    public async CreatedCategory(category: CreateCategory) {

        try {
            return await this.http.post(HttpQueryStrings.ApiCategory, category, this.options).toPromise();

        } catch (ex) {

            return ex;
        }
    }

    public async DeleteCategory(category: any) {

        try {
            return  await this.http.delete(HttpQueryStrings.ApiCategory + category, this.options).toPromise();

        } catch (ex) {

            return ex;
        }
    }

    public async EditCategory(category: any) {

        try {
            return  await this.http.put(HttpQueryStrings.ApiCategory, category, this.options).toPromise();

        } catch (ex) {

            return ex;
        }
    }

    public async GetActiveCategory() {


        try {
            return (await this.http.get(HttpQueryStrings.ODataCategoriesActive, this.options).toPromise()).json().Items;

        } catch (ex) {

            return ex;
        }
    }

    public async getCategoryById(id: any) {


        let query = HttpQueryStrings.GetCategoryById + id;

        try {
            return (await this.http.get(query, this.options).toPromise()).json().Items[0];

        } catch (ex) {

            return ex;
        }
    }

    public async getCategoriesElastic() {


        let query = HttpQueryStrings.GetCategoriesElastic;

        try {
            return (await this.http.get(query, this.options).toPromise()).json();

        } catch (ex) {

            return ex;
        }
    }
    
    public async getCategoryByName(name: any) {


        let query = HttpQueryStrings.GetCategoryByName + name + "'";

        try {
            return (await this.http.get(query, this.options).toPromise()).json().Items[0];

        } catch (ex) {

            return ex;
        }
    }
}