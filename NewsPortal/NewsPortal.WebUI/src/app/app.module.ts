import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { RegistrationComponent } from './components/registrastion/registration.component';
import { ViewNewsComponent } from './components/viewnews/viewnews.component';
import { EditCategoryComponent } from './components/adminpanel/editcategories/editcategory.component';
import { EditNewsComponent } from './components/adminpanel/editnews/editnews.component';
import { ManageCategoryComponent } from './components/adminpanel/managecategories/managecategory.component';
import { ManageNewsComponent } from './components/adminpanel/managenews/managenews.component';
import { CreateNewsComponent } from './components/create/news/createnews.component';
import { CreateCategoryComponent } from './components/create/category/createcategory.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';

import { HttpAuthService } from './services/http.auth.service';
import { HttpCategoryService } from './services/http.category.service';
import { HttpNewsService } from './services/http.news.service';

import { Ng2CompleterModule } from "ng2-completer";
import { NgSelectModule } from '@ng-select/ng-select';
import { MyDatePickerModule } from 'mydatepicker';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { UiSwitchModule } from 'angular2-ui-switch';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { GridModule } from '@syncfusion/ej2-ng-grids';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

import { PaginatePipe } from 'ng2-pagination';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, data: { title: 'Index' } },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard], data: { title: 'Login' } },
    { path: 'registration', component: RegistrationComponent, canActivate: [LoginGuard], data: { title: 'Registration' } },
    { path: 'adminpanel/create/news', component: CreateNewsComponent, canActivate: [AuthGuard], data: { title: 'Create news' } },
    { path: 'adminpanel/create/category', component: CreateCategoryComponent, canActivate: [AuthGuard], data: { title: 'Create category' } },
    { path: 'adminpanel/manage/news', component: ManageNewsComponent, canActivate: [AuthGuard, AdminGuard], data: { title: 'Manage news' } },
    { path: 'adminpanel/manage/categories', component: ManageCategoryComponent, canActivate: [AuthGuard, AdminGuard], data: { title: 'Manage categories' } },
    { path: 'adminpanel/manage/categories/:id', component: EditCategoryComponent, canActivate: [AuthGuard, AdminGuard], data: { title: 'Edit category' } },
    { path: 'adminpanel/manage/news/:id', component: EditNewsComponent, canActivate: [AuthGuard, AdminGuard], data: { title: 'Edit news' } },
    { path: 'view/news/:newsId', component: ViewNewsComponent, data: { title: 'News' } },
    { path: ':categoryName/:searchValue', component: HomeComponent, data: { title: 'Index' } },
    { path: ':categoryName', component: HomeComponent, data: { title: 'Index' } },
    { path: 'notfound', component: NotFoundComponent, data: { title: 'Not found' } },
    { path: '**', component: NotFoundComponent, data: { title: 'Not found' } }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        NotFoundComponent,
        RegistrationComponent,
        CreateNewsComponent,
        ViewNewsComponent,
        CreateNewsComponent,
        CreateCategoryComponent,
        EditNewsComponent,
        EditCategoryComponent,
        PaginatePipe, 
        ManageCategoryComponent,
        ManageNewsComponent
    ],
    imports: [
        FroalaEditorModule.forRoot(), 
        FroalaViewModule.forRoot(),
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        HttpModule,
        Ng2CompleterModule,
        NgSelectModule,
        VirtualScrollModule,
        MyDatePickerModule,
        UiSwitchModule,
        GridModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger'
        })
    ],
    providers: [
        LoginGuard,
        AuthGuard,
        AdminGuard,
        HttpNewsService,
        HttpAuthService,
        HttpCategoryService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
