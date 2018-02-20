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
var ng2_completer_1 = require("ng2-completer");
var CreateNews_1 = require("../../../models/CreateNews");
var http_news_service_1 = require("../../../services/http.news.service");
var http_category_service_1 = require("../../../services/http.category.service");
var createnews_1 = require("app/models/components/createnews");
var ParserErrorResponse_1 = require("../../../helpers/ParserErrorResponse");
var CreateNewsComponent = /** @class */ (function () {
    function CreateNewsComponent(httpCategoryService, httpNewsService, router, completerService) {
        this.httpCategoryService = httpCategoryService;
        this.httpNewsService = httpNewsService;
        this.router = router;
        this.completerService = completerService;
        this.componentModel = new createnews_1.CreateNewsComponentModel();
        this.myDatePickerOptions = {
            dateFormat: 'mm.dd.yyyy',
        };
        this.optionsFroalaEditor = {
            placeholderText: 'Please input body for news!',
            heightMin: 250,
            imageUploadURL: '/api/file/upload'
        };
    }
    CreateNewsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.componentModel;
                        return [4 /*yield*/, this.httpCategoryService.GetActiveCategory()];
                    case 1:
                        _a.categories = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateNewsComponent.prototype.createNews = function (news) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.componentModel.validateNews.errors.errorsGlobalNews = new Array();
                        this.componentModel.validateNews.errors.errorsForBody = new Array();
                        this.componentModel.validateNews.errors.errorsForCategory = new Array();
                        this.componentModel.validateNews.errors.errorsForDate = new Array();
                        this.componentModel.validateNews.errors.errorsForTitle = new Array();
                        this.componentModel.validateNews.errors.errorsForDescription = new Array();
                        this.componentModel.validateNews.validateBody(news.Body);
                        this.componentModel.validateNews.validateCategory(news.CategoryId);
                        this.componentModel.validateNews.validateDate(news.CreatedDate);
                        this.componentModel.validateNews.validateTitle(news.Title);
                        this.componentModel.validateNews.validateDescription(news.Description);
                        if (!(this.componentModel.validateNews.validBody && this.componentModel.validateNews.validChooseCategory
                            && this.componentModel.validateNews.validDate && this.componentModel.validateNews.validTitle
                            && this.componentModel.validateNews.validDescription)) return [3 /*break*/, 2];
                        this.componentModel.creatingItem = true;
                        try {
                            news.CreatedDate = news.CreatedDate.formatted;
                        }
                        catch (ex) {
                            news.CreatedDate = new Date();
                        }
                        news.Published = news.Published ? true : false;
                        return [4 /*yield*/, this.httpNewsService.CreatedNews(news)];
                    case 1:
                        response = _a.sent();
                        if (response.status == 200) {
                            this.componentModel.createdNews = new CreateNews_1.CreateNews();
                            this.router.navigate(['/view/news/' + response.json().Id]);
                        }
                        else if (response.status == 400) {
                            data = response.json();
                            this.componentModel.validateNews.errors = ParserErrorResponse_1.ParsingErrorResponse.parsingCreatedNewsResponse(data);
                        }
                        this.componentModel.creatingItem = false;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CreateNewsComponent = __decorate([
        core_1.Component({
            selector: 'create-news-app',
            templateUrl: './createnews.component.html',
            providers: [http_category_service_1.HttpCategoryService, http_news_service_1.HttpNewsService]
        }),
        __metadata("design:paramtypes", [http_category_service_1.HttpCategoryService,
            http_news_service_1.HttpNewsService,
            router_1.Router,
            ng2_completer_1.CompleterService])
    ], CreateNewsComponent);
    return CreateNewsComponent;
}());
exports.CreateNewsComponent = CreateNewsComponent;
//# sourceMappingURL=createnews.component.js.map