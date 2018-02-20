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
var ej2_grids_1 = require("@syncfusion/ej2-grids");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_ng_grids_1 = require("@syncfusion/ej2-ng-grids");
var http_category_service_1 = require("../../../services/http.category.service");
var HttpQueryStrings_1 = require("app/helpers/HttpQueryStrings");
ej2_grids_1.Grid.Inject(ej2_grids_1.Page, ej2_grids_1.Selection);
var ManageCategoryComponent = /** @class */ (function () {
    function ManageCategoryComponent(httpCategoryService, router) {
        this.httpCategoryService = httpCategoryService;
        this.router = router;
    }
    ManageCategoryComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.filter = {
                    type: 'checkbox'
                };
                this.filterSettings = { type: 'menu' };
                this.dataCategory = new ej2_data_1.DataManager({ url: HttpQueryStrings_1.HttpQueryStrings.ApiCategory, adaptor: new ej2_data_1.WebApiAdaptor, crossDomain: false });
                this.pageCategoryOptions = { pageSizes: true, pageCount: 5 };
                this.commands = [
                    { type: 'edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat', click: this.editCategory.bind(this) } },
                    { type: 'delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat', click: this.removeCategory.bind(this) } }
                ];
                return [2 /*return*/];
            });
        });
    };
    ManageCategoryComponent.prototype.removeCategory = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpCategoryService.DeleteCategory(this.gridCategoty.getSelectedRecords()[0].Id)];
                    case 1:
                        _a.sent();
                        try {
                            this.gridCategoty.refresh();
                        }
                        catch (ex) { }
                        return [2 /*return*/];
                }
            });
        });
    };
    ManageCategoryComponent.prototype.editCategory = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.router.navigate(['/adminpanel/manage/categories/' + this.gridCategoty.getSelectedRecords()[0].Id]);
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        core_1.ViewChild('gridCategoty'),
        __metadata("design:type", ej2_ng_grids_1.GridComponent)
    ], ManageCategoryComponent.prototype, "gridCategoty", void 0);
    ManageCategoryComponent = __decorate([
        core_1.Component({
            selector: 'create-news-app',
            templateUrl: './managecategory.component.html',
            providers: [ej2_ng_grids_1.FilterService, ej2_ng_grids_1.SortService, ej2_ng_grids_1.CommandColumnService]
        }),
        __metadata("design:paramtypes", [http_category_service_1.HttpCategoryService,
            router_1.Router])
    ], ManageCategoryComponent);
    return ManageCategoryComponent;
}());
exports.ManageCategoryComponent = ManageCategoryComponent;
//# sourceMappingURL=managecategory.component.js.map