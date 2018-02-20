"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var home_component_1 = require("./components/home/home.component");
var login_component_1 = require("./components/login/login.component");
var notfound_component_1 = require("./components/notfound/notfound.component");
var registration_component_1 = require("./components/registrastion/registration.component");
var viewnews_component_1 = require("./components/viewnews/viewnews.component");
var editcategory_component_1 = require("./components/adminpanel/editcategories/editcategory.component");
var editnews_component_1 = require("./components/adminpanel/editnews/editnews.component");
var managecategory_component_1 = require("./components/adminpanel/managecategories/managecategory.component");
var managenews_component_1 = require("./components/adminpanel/managenews/managenews.component");
var createnews_component_1 = require("./components/create/news/createnews.component");
var createcategory_component_1 = require("./components/create/category/createcategory.component");
var auth_guard_1 = require("./guards/auth.guard");
var login_guard_1 = require("./guards/login.guard");
var admin_guard_1 = require("./guards/admin.guard");
var http_auth_service_1 = require("./services/http.auth.service");
var http_category_service_1 = require("./services/http.category.service");
var http_news_service_1 = require("./services/http.news.service");
var ng2_completer_1 = require("ng2-completer");
var ng_select_1 = require("@ng-select/ng-select");
var mydatepicker_1 = require("mydatepicker");
var angular_confirmation_popover_1 = require("angular-confirmation-popover");
var angular2_ui_switch_1 = require("angular2-ui-switch");
var angular2_froala_wysiwyg_1 = require("angular2-froala-wysiwyg");
var ej2_ng_grids_1 = require("@syncfusion/ej2-ng-grids");
var angular2_virtual_scroll_1 = require("angular2-virtual-scroll");
var ng2_pagination_1 = require("ng2-pagination");
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent, data: { title: 'Index' } },
    { path: 'login', component: login_component_1.LoginComponent, canActivate: [login_guard_1.LoginGuard], data: { title: 'Login' } },
    { path: 'registration', component: registration_component_1.RegistrationComponent, canActivate: [login_guard_1.LoginGuard], data: { title: 'Registration' } },
    { path: 'adminpanel/create/news', component: createnews_component_1.CreateNewsComponent, canActivate: [auth_guard_1.AuthGuard], data: { title: 'Create news' } },
    { path: 'adminpanel/create/category', component: createcategory_component_1.CreateCategoryComponent, canActivate: [auth_guard_1.AuthGuard], data: { title: 'Create category' } },
    { path: 'adminpanel/manage/news', component: managenews_component_1.ManageNewsComponent, canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard], data: { title: 'Manage news' } },
    { path: 'adminpanel/manage/categories', component: managecategory_component_1.ManageCategoryComponent, canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard], data: { title: 'Manage categories' } },
    { path: 'adminpanel/manage/categories/:id', component: editcategory_component_1.EditCategoryComponent, canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard], data: { title: 'Edit category' } },
    { path: 'adminpanel/manage/news/:id', component: editnews_component_1.EditNewsComponent, canActivate: [auth_guard_1.AuthGuard, admin_guard_1.AdminGuard], data: { title: 'Edit news' } },
    { path: 'view/news/:newsId', component: viewnews_component_1.ViewNewsComponent, data: { title: 'News' } },
    { path: ':categoryName/:searchValue', component: home_component_1.HomeComponent, data: { title: 'Index' } },
    { path: ':categoryName', component: home_component_1.HomeComponent, data: { title: 'Index' } },
    { path: 'notfound', component: notfound_component_1.NotFoundComponent, data: { title: 'Not found' } },
    { path: '**', component: notfound_component_1.NotFoundComponent, data: { title: 'Not found' } }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                notfound_component_1.NotFoundComponent,
                registration_component_1.RegistrationComponent,
                createnews_component_1.CreateNewsComponent,
                viewnews_component_1.ViewNewsComponent,
                createnews_component_1.CreateNewsComponent,
                createcategory_component_1.CreateCategoryComponent,
                editnews_component_1.EditNewsComponent,
                editcategory_component_1.EditCategoryComponent,
                ng2_pagination_1.PaginatePipe,
                managecategory_component_1.ManageCategoryComponent,
                managenews_component_1.ManageNewsComponent
            ],
            imports: [
                angular2_froala_wysiwyg_1.FroalaEditorModule.forRoot(),
                angular2_froala_wysiwyg_1.FroalaViewModule.forRoot(),
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(appRoutes),
                http_1.HttpModule,
                ng2_completer_1.Ng2CompleterModule,
                ng_select_1.NgSelectModule,
                angular2_virtual_scroll_1.VirtualScrollModule,
                mydatepicker_1.MyDatePickerModule,
                angular2_ui_switch_1.UiSwitchModule,
                ej2_ng_grids_1.GridModule,
                angular_confirmation_popover_1.ConfirmationPopoverModule.forRoot({
                    confirmButtonType: 'danger'
                })
            ],
            providers: [
                login_guard_1.LoginGuard,
                auth_guard_1.AuthGuard,
                admin_guard_1.AdminGuard,
                http_news_service_1.HttpNewsService,
                http_auth_service_1.HttpAuthService,
                http_category_service_1.HttpCategoryService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map