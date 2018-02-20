import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { HttpQueryStrings } from '../helpers/HttpQueryStrings'
import { CreateNews } from '../models/CreateNews'

@Injectable()
export class HttpNewsService {

    constructor(
        private http: Http,
        private router: Router
    ) { }

    private options: any = {

        withCredentials: true
    };

    public async CreatedNews(news: CreateNews) {

        try {
            return await this.http.post(HttpQueryStrings.ApiNews, news, this.options).toPromise();

        } catch (ex) {

            return ex;
        }
    }

    public async DeleteNews(news: any) {

        try {

            return await this.http.delete(HttpQueryStrings.ApiNews + news, this.options).toPromise();

        } catch (ex) {

            return ex;
        }
    }

    public async EditNews(news: any) {

        try {
            return await this.http.put(HttpQueryStrings.ApiNews, news, this.options).toPromise();

        } catch (ex) {

            return ex;
        }
    }

    public async getNewsById(id: any) {


        let query = HttpQueryStrings.GetNewsById + id;

        try {
            return (await this.http.get(query, this.options).toPromise()).json().Items[0];
            
        } catch (ex) {

            return ex;
        }
    }

    public async getNews(skip, top) {


        let query = HttpQueryStrings.ODataNewsPublished + '&$skip=' + skip + '&$top=' + top;

        try {
            return (await this.http.get(query, this.options).toPromise()).json();

        } catch (ex) {

            return ex;
        }
    }

    public async getNewsByCategory(id, skip, top) {


        let query = HttpQueryStrings.GetNewsByCategory + id + '&$skip=' + skip + '&$top=' + top;

        try {
            return (await this.http.get(query, this.options).toPromise()).json();

        } catch (ex) {

            return ex;
        }
    }

    public async getAllNewsElastic(from, size) {


        let query = HttpQueryStrings.GetAllNewsFromElastic + 'from=' + from + '&count=' + size;

        try {
            return (await this.http.get(query, this.options).toPromise()).json();

        } catch (ex) {

            return ex;
        }
    }

    public async getNewsCategoryElastic(value, from, size) {


        let query = HttpQueryStrings.GetNewsFromCategoryElastic + 'category=' + value + '&from=' + from + '&count=' + size;

        try {
            return (await this.http.get(query, this.options).toPromise()).json();

        } catch (ex) {

            return ex;
        }
    }

    public async getNewsValueElastic(value, from, size) {


        let query = HttpQueryStrings.GetNewsFromValueElastic + 'searchTerm=' + value + '&from=' + from + '&count=' + size;

        try {
            return (await this.http.get(query, this.options).toPromise()).json();

        } catch (ex) {

            return ex;
        }
    }

    public async getNewsValueAndCategoryElastic(value, category, from, size) {


        let query = HttpQueryStrings.GetNewsFromValueElastic + 'category=' + category + '&searchTerm=' + value + '&from=' + from + '&count=' + size;

        try {
            return (await this.http.get(query, this.options).toPromise()).json();

        } catch (ex) {

            return ex;
        }
    }
}