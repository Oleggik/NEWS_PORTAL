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
var http_category_service_1 = require("../../../services/http.category.service");
var http_news_service_1 = require("../../../services/http.news.service");
var ParserErrorResponse_1 = require("app/helpers/ParserErrorResponse");
var ValidatorNews_1 = require("app/helpers/ValidatorNews");
var EditNewsComponent = /** @class */ (function () {
    function EditNewsComponent(httpCategoryService, httpNewsService, activateRoute, elementRef, router) {
        var _this = this;
        this.httpCategoryService = httpCategoryService;
        this.httpNewsService = httpNewsService;
        this.activateRoute = activateRoute;
        this.elementRef = elementRef;
        this.router = router;
        this.preview = false;
        this.validateNews = new ValidatorNews_1.ValidatorNews();
        this.startEditing = false;
        this.selectedNews = {};
        this.categories = [];
        this.subscription = activateRoute.params.subscribe(function (params) { return _this.newsId = params['id']; });
    }
    EditNewsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.httpNewsService.getNewsById(this.newsId)];
                    case 1:
                        _a.selectedNews = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.httpCategoryService.GetActiveCategory()];
                    case 2:
                        _b.categories = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditNewsComponent.prototype.editNews = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.validateNews.errors.errorsGlobalNews = new Array();
                        this.validateNews.errors.errorsForBody = new Array();
                        this.validateNews.errors.errorsForCategory = new Array();
                        this.validateNews.errors.errorsForDate = new Array();
                        this.validateNews.errors.errorsForTitle = new Array();
                        this.validateNews.errors.errorsForDescription = new Array();
                        this.validateNews.validateBody(item.Body);
                        this.validateNews.validateCategory(item.CategoryId);
                        this.validateNews.validateDate(item.CreatedDate);
                        this.validateNews.validateTitle(item.Title);
                        this.validateNews.validateDescription(item.Description);
                        if (!(this.validateNews.validBody && this.validateNews.validChooseCategory
                            && this.validateNews.validDate
                            && this.validateNews.validateDescription)) return [3 /*break*/, 2];
                        this.startEditing = true;
                        if (item.CreatedDate["formatted"]) {
                            item.CreatedDate = item.CreatedDate.formatted;
                        }
                        item.Published = item.Published ? true : false;
                        return [4 /*yield*/, this.httpNewsService.EditNews(item)];
                    case 1:
                        response = _a.sent();
                        if (response.status == 200) {
                            this.router.navigate(['adminpanel/manage/news']);
                        }
                        else if (response.status == 400) {
                            data = response.json();
                            this.validateNews.errors = ParserErrorResponse_1.ParsingErrorResponse.parsingCreatedNewsResponse(data);
                        }
                        this.startEditing = false;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    EditNewsComponent.prototype.closeEditing = function () {
        this.router.navigate(['adminpanel/manage/news']);
    };
    EditNewsComponent.prototype.previewStart = function (item) {
        this.news = item;
        this.preview = true;
    };
    EditNewsComponent.prototype.closePreview = function () {
        this.preview = false;
        this.news = {};
    };
    EditNewsComponent = __decorate([
        core_1.Component({
            selector: 'create-news-app',
            templateUrl: './editnews.component.html'
        }),
        __metadata("design:paramtypes", [http_category_service_1.HttpCategoryService,
            http_news_service_1.HttpNewsService,
            router_1.ActivatedRoute,
            core_1.ElementRef,
            router_1.Router])
    ], EditNewsComponent);
    return EditNewsComponent;
}());
exports.EditNewsComponent = EditNewsComponent;
//# sourceMappingURL=editnews.component.js.map