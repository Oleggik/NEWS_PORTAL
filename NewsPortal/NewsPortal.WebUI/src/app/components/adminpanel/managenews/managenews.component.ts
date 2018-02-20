import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Grid, Page, Selection } from '@syncfusion/ej2-grids';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { FilterService, GridComponent, IFilter, SortService, CommandColumnService, CommandModel } from "@syncfusion/ej2-ng-grids";

import { HttpNewsService } from '../../../services/http.news.service';

import { HttpQueryStrings } from "app/helpers/HttpQueryStrings";

Grid.Inject(Page, Selection);

@Component({
    selector: 'create-news-app',
    templateUrl: './managenews.component.html',
    providers: [FilterService, SortService, CommandColumnService]
})

export class ManageNewsComponent implements OnInit {

    public data: DataManager;
    public pageOptions: Object;
    public filterSettings: Object;
    public edit: CommandModel[];
    public delete: CommandModel[];
    public view: CommandModel[];
    public filterNews: IFilter;

    @ViewChild('grid')
    public grid: GridComponent;
    
    public constructor(
        private httpNewsService: HttpNewsService,
        private router: Router
    ) { }

    async ngOnInit() {

        this.filterNews = {
            type: 'checkbox'
        };

        this.filterSettings = { type: 'menu' };
        this.data = new DataManager({ url: HttpQueryStrings.ApiNews, adaptor: new WebApiAdaptor, crossDomain: false });
        this.pageOptions = { pageSizes: true, pageCount: 5 };

        this.view = [
            { type: 'edit', buttonOption: { iconCss: 'fas fa-eye', cssClass: 'e-flat', click: this.rowNewsSelected.bind(this) } }
        ];

        this.edit = [
            { type: 'edit', buttonOption: { iconCss: 'fas fa-edit', cssClass: 'e-flat', click: this.editNews.bind(this) } }
        ];

        this.delete = [
            { type: 'delete', buttonOption: { iconCss: 'fas fa-trash-alt', cssClass: 'e-flat', click: this.removeNews.bind(this) } }
        ];
    }

    public rowNewsSelected(item) {

        this.router.navigate(['/view/news/' + (<any>this.grid.getSelectedRecords()[0]).Id]);
    }

    public async removeNews(item) {

        await this.httpNewsService.DeleteNews((<any>this.grid.getSelectedRecords()[0]).Id);
        try { this.grid.refresh(); } catch (ex) { }
    }

    public editNews(item) {

        this.router.navigate(['/adminpanel/manage/news/' + (<any>this.grid.getSelectedRecords()[0]).Id]);
    }
}