import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Grid, Page, Selection } from '@syncfusion/ej2-grids';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { FilterService, GridComponent, IFilter, SortService, CommandColumnService, CommandModel } from "@syncfusion/ej2-ng-grids";

import { HttpCategoryService } from '../../../services/http.category.service';

import { HttpQueryStrings } from "app/helpers/HttpQueryStrings";

Grid.Inject(Page, Selection);

@Component({
    selector: 'create-news-app',
    templateUrl: './managecategory.component.html',
    providers: [FilterService, SortService, CommandColumnService]
})

export class ManageCategoryComponent implements OnInit {

    public dataCategory: DataManager;
    public pageCategoryOptions: Object;
    public commands: CommandModel[];
    public filterSettings: Object;
    public filter: IFilter;

    @ViewChild('gridCategoty')
    public gridCategoty: GridComponent;


    public constructor(
        private httpCategoryService: HttpCategoryService,
        private router: Router
    ) { }
    
    async ngOnInit() {

        this.filter = {
            type: 'checkbox'
        };
        
        this.filterSettings = { type: 'menu' };
        this.dataCategory = new DataManager({ url: HttpQueryStrings.ApiCategory, adaptor: new WebApiAdaptor, crossDomain: false });
        this.pageCategoryOptions = { pageSizes: true, pageCount: 5 };
        
        this.commands = [
            { type: 'edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat', click: this.editCategory.bind(this) } },
            { type: 'delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat', click: this.removeCategory.bind(this) } }
        ];
    }

    public async removeCategory(item) {

        await this.httpCategoryService.DeleteCategory((<any>this.gridCategoty.getSelectedRecords()[0]).Id);
        try { this.gridCategoty.refresh(); } catch (ex) { }
    }

    public async editCategory(item) {

        this.router.navigate(['/adminpanel/manage/categories/' + (<any>this.gridCategoty.getSelectedRecords()[0]).Id]);
    }
}