"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_category_service_1 = require("../../services/http.category.service");
var http_news_service_1 = require("../../services/http.news.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(httpCategoryService, httpNewsService, activateRoute, router) {
        this.httpCategoryService = httpCategoryService;
        this.httpNewsService = httpNewsService;
        this.activateRoute = activateRoute;
        this.router = router;
        this.loading = false;
        this.categoriesDatabase = [];
        this.categoriesElastic = [];
        this.news = [];
        this.archive = false;
        this.searchValue = "";
        this.currentPage = 0;
        this.totalSizePage = 0;
        this.sizeNews = 6;
    }
    HomeComponent.prototype.getNextNewsPage = function () {
        this.currentPage++;
        this.getNews();
    };
    HomeComponent.prototype.getPrevNewsPage = function () {
        this.currentPage--;
        this.getNews();
    };
    HomeComponent.prototype.getElasticNews = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.searchValue && !this.categoryNow)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.httpNewsService.getAllNewsElastic(this.currentPage * this.sizeNews, this.sizeNews)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(!this.searchValue && this.categoryNow)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.httpNewsService.getNewsCategoryElastic(this.categoryNow.Name, this.currentPage * this.sizeNews, this.sizeNews)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        if (!(this.searchValue && !this.categoryNow)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.httpNewsService.getNewsValueElastic(this.searchValue, this.currentPage * this.sizeNews, this.sizeNews)];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        if (!(this.searchValue && this.categoryNow)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.httpNewsService.getNewsValueAndCategoryElastic(this.categoryNow.Name, this.searchValue, this.currentPage * this.sizeNews, this.sizeNews)];
                    case 7: return [2 /*return*/, _a.sent()];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.getDatabaseNews = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.categoryNow) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.httpNewsService.getNews(this.currentPage * this.sizeNews, this.sizeNews)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.httpNewsService.getNewsByCategory(this.categoryNow.Id, this.currentPage * this.sizeNews, this.sizeNews)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HomeComponent.prototype.getNews = function () {
        return __awaiter(this, void 0, void 0, function () {
            var respons;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        if (!this.archive) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getDatabaseNews()];
                    case 1:
                        respons = _a.sent();
                        this.news = respons.Items;
                        this.totalSizePage = respons.Count;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getElasticNews()];
                    case 3:
                        respons = _a.sent();
                        this.news = respons.Data;
                        this.totalSizePage = respons.Total;
                        _a.label = 4;
                    case 4:
                        this.loading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, ex_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.loading = true;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        this.resetPage();
                        this.getNews();
                        _a = this;
                        return [4 /*yield*/, this.httpCategoryService.GetActiveCategory()];
                    case 2:
                        _a.categoriesDatabase = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.httpCategoryService.getCategoriesElastic()];
                    case 3:
                        _b.categoriesElastic = _c.sent();
                        this.archive = JSON.parse(localStorage.getItem('archive'));
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _c.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        this.loading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.changecategory = function (id, category) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.searchValue) {
                            this.router.navigate(['/', category]);
                        }
                        else {
                            this.router.navigateByUrl('/' + category + '/' + this.searchValue);
                        }
                        return [4 /*yield*/, this.resetPage()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.allNews = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.router.navigate(['/']);
                        return [4 /*yield*/, this.resetPage()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.onSubmit = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.categoryNow) {
                            this.router.navigate(['/', this.categoryNow.Name, this.searchValue]);
                        }
                        else {
                            this.router.navigate(['/', "all", this.searchValue]);
                        }
                        return [4 /*yield*/, this.resetPage()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.onChange = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, localStorage.setItem('archive', JSON.stringify(!this.archive))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.resetPage()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.resetPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var category, search, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.activateRoute.params.subscribe(function (params) { return category = params['categoryName']; })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.activateRoute.params.subscribe(function (params) { return search = params['searchValue']; })];
                    case 2:
                        _b.sent();
                        if (!(category && category.toLowerCase() !== "all")) return [3 /*break*/, 4];
                        _a = this;
                        return [4 /*yield*/, this.httpCategoryService.getCategoryByName(decodeURI(category))];
                    case 3:
                        _a.categoryNow = (_b.sent());
                        _b.label = 4;
                    case 4:
                        if (search) {
                            this.searchValue = decodeURI(search);
                        }
                        this.currentPage = 0;
                        return [4 /*yield*/, this.getNews()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home-app',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [http_category_service_1.HttpCategoryService,
            http_news_service_1.HttpNewsService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map