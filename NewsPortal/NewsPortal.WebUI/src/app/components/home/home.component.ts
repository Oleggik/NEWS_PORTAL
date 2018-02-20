import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpCategoryService } from '../../services/http.category.service';
import { HttpNewsService } from '../../services/http.news.service';

@Component({
    selector: 'home-app',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
    
export class HomeComponent implements OnInit {

    public loading: boolean = false;

    public categoriesDatabase: any[] = [];
    public categoriesElastic: any[] = [];
    public news: any[] = [];

    public archive: boolean = false;

    public categoryNow: any;
    public searchValue: string = "";

    public currentPage: number = 0;
    public totalSizePage: number = 0;
    public sizeNews: number = 6;

    private getNextNewsPage() {

        this.currentPage++;
        this.getNews();
    }

    private getPrevNewsPage() {

        this.currentPage--;
        this.getNews();
    }

    private async getElasticNews() {

        if (!this.searchValue && !this.categoryNow) {

            return await this.httpNewsService.getAllNewsElastic(this.currentPage * this.sizeNews, this.sizeNews);

        } else if (!this.searchValue && this.categoryNow) {

            return await this.httpNewsService.getNewsCategoryElastic(this.categoryNow.Name, this.currentPage * this.sizeNews, this.sizeNews);

        } else if (this.searchValue && !this.categoryNow) {

            return await this.httpNewsService.getNewsValueElastic(this.searchValue, this.currentPage * this.sizeNews, this.sizeNews);

        } else if (this.searchValue && this.categoryNow) {

            return await this.httpNewsService.getNewsValueAndCategoryElastic(this.categoryNow.Name, this.searchValue, this.currentPage * this.sizeNews, this.sizeNews);
        }
    }

    private async getDatabaseNews() {

        if (!this.categoryNow) {

            return await this.httpNewsService.getNews(this.currentPage * this.sizeNews, this.sizeNews);

        } else  {

            return await this.httpNewsService.getNewsByCategory(this.categoryNow.Id, this.currentPage * this.sizeNews, this.sizeNews);
        }
    }

    private async getNews() {

        this.loading = true;
        let respons; 

        if (this.archive) {

            respons = await this.getDatabaseNews();
            this.news = respons.Items;
            this.totalSizePage = respons.Count;
            
        } else {

            respons = await this.getElasticNews();
            this.news = respons.Data;
            this.totalSizePage = respons.Total;
        }
        
        this.loading = false;
    }

    async ngOnInit() {

        this.loading = true;

        try {

            this.resetPage();
            this.getNews();

            this.categoriesDatabase = await this.httpCategoryService.GetActiveCategory();
            this.categoriesElastic = await this.httpCategoryService.getCategoriesElastic();

            this.archive = JSON.parse(localStorage.getItem('archive'));

        } catch (ex) { }

        this.loading = false;
    }

    public constructor(
        private httpCategoryService: HttpCategoryService,
        private httpNewsService: HttpNewsService,
        private activateRoute: ActivatedRoute,
        private router: Router
    ) { }

    public async changecategory(id, category) {

        if (!this.searchValue) {

            this.router.navigate(['/', category]);

        } else {

            this.router.navigateByUrl('/' + category + '/' + this.searchValue);
        }

        await this.resetPage();
    }

    public async allNews() {

        this.router.navigate(['/']);

        await this.resetPage();
    }

    public async onSubmit(value) {

        if (this.categoryNow) {

            this.router.navigate(['/', this.categoryNow.Name, this.searchValue]);

        } else {

            this.router.navigate(['/', "all", this.searchValue]);
        }

        await this.resetPage();
    }

    public async onChange(event) {

        await localStorage.setItem('archive', JSON.stringify(!this.archive));
        await this.resetPage();
    }

    private async resetPage() {

        let category;
        let search;

        await this.activateRoute.params.subscribe(params => category = params['categoryName']);
        await this.activateRoute.params.subscribe(params => search = params['searchValue']);

        if (category && category.toLowerCase() !== "all") {

            this.categoryNow = (await this.httpCategoryService.getCategoryByName(decodeURI(category)));
        }

        if (search) {

            this.searchValue = decodeURI(search);
        }

        this.currentPage = 0;
        await this.getNews();
    }
}