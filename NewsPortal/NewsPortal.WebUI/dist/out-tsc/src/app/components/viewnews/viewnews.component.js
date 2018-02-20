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
var http_news_service_1 = require("../../services/http.news.service");
var http_auth_service_1 = require("../../services/http.auth.service");
var FullNews_1 = require("../../models/FullNews");
var ViewNewsComponent = /** @class */ (function () {
    function ViewNewsComponent(httpNewsService, httpAuthService, activateRoute, router) {
        var _this = this;
        this.httpNewsService = httpNewsService;
        this.httpAuthService = httpAuthService;
        this.activateRoute = activateRoute;
        this.router = router;
        this.news = new FullNews_1.FullNews();
        this.subscription = activateRoute.params.subscribe(function (params) { return _this.newsId = params['newsId']; });
    }
    ViewNewsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newsFromServer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpNewsService.getNewsById(this.newsId)];
                    case 1:
                        newsFromServer = (_a.sent());
                        if (newsFromServer.length == 0) {
                            this.router.navigate(['notfound']);
                        }
                        else {
                            if (!(this.httpAuthService.IsInRole("admin")) && newsFromServer.Published == false) {
                                this.router.navigate(['notfound']);
                            }
                            else {
                                this.news = newsFromServer;
                                this.news.Body = this.news.Body.replace('\\', '');
                                this.div.nativeElement.innerHTML = this.news.Body;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild('div'),
        __metadata("design:type", core_1.ElementRef)
    ], ViewNewsComponent.prototype, "div", void 0);
    ViewNewsComponent = __decorate([
        core_1.Component({
            selector: 'create-news-app',
            templateUrl: './viewnews.component.html'
        }),
        __metadata("design:paramtypes", [http_news_service_1.HttpNewsService,
            http_auth_service_1.HttpAuthService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], ViewNewsComponent);
    return ViewNewsComponent;
}());
exports.ViewNewsComponent = ViewNewsComponent;
//# sourceMappingURL=viewnews.component.js.map