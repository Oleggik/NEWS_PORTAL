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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var HttpQueryStrings_1 = require("../helpers/HttpQueryStrings");
var HttpCategoryService = /** @class */ (function () {
    function HttpCategoryService(http, router) {
        this.http = http;
        this.router = router;
        this.options = {
            withCredentials: true
        };
    }
    HttpCategoryService.prototype.CreatedCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.post(HttpQueryStrings_1.HttpQueryStrings.ApiCategory, category, this.options).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_1 = _a.sent();
                        return [2 /*return*/, ex_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HttpCategoryService.prototype.DeleteCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.delete(HttpQueryStrings_1.HttpQueryStrings.ApiCategory + category, this.options).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_2 = _a.sent();
                        return [2 /*return*/, ex_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HttpCategoryService.prototype.EditCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.put(HttpQueryStrings_1.HttpQueryStrings.ApiCategory, category, this.options).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        ex_3 = _a.sent();
                        return [2 /*return*/, ex_3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HttpCategoryService.prototype.GetActiveCategory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.get(HttpQueryStrings_1.HttpQueryStrings.ODataCategoriesActive, this.options).toPromise()];
                    case 1: return [2 /*return*/, (_a.sent()).json().Items];
                    case 2:
                        ex_4 = _a.sent();
                        return [2 /*return*/, ex_4];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HttpCategoryService.prototype.getCategoryById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = HttpQueryStrings_1.HttpQueryStrings.GetCategoryById + id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.get(query, this.options).toPromise()];
                    case 2: return [2 /*return*/, (_a.sent()).json().Items[0]];
                    case 3:
                        ex_5 = _a.sent();
                        return [2 /*return*/, ex_5];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HttpCategoryService.prototype.getCategoriesElastic = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = HttpQueryStrings_1.HttpQueryStrings.GetCategoriesElastic;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.get(query, this.options).toPromise()];
                    case 2: return [2 /*return*/, (_a.sent()).json()];
                    case 3:
                        ex_6 = _a.sent();
                        return [2 /*return*/, ex_6];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HttpCategoryService.prototype.getCategoryByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var query, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = HttpQueryStrings_1.HttpQueryStrings.GetCategoryByName + name + "'";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.get(query, this.options).toPromise()];
                    case 2: return [2 /*return*/, (_a.sent()).json().Items[0]];
                    case 3:
                        ex_7 = _a.sent();
                        return [2 /*return*/, ex_7];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HttpCategoryService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router])
    ], HttpCategoryService);
    return HttpCategoryService;
}());
exports.HttpCategoryService = HttpCategoryService;
//# sourceMappingURL=http.category.service.js.map