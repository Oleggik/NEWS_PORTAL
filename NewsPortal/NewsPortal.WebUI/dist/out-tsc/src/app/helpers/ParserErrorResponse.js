"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelsError_1 = require("app/models/ModelsError");
var ParsingErrorResponse = /** @class */ (function () {
    function ParsingErrorResponse() {
    }
    ParsingErrorResponse.parsingCreatedNewsResponse = function (data) {
        var errorsCreatedNews = {
            errorsGlobalNews: new Array(),
            errorsForTitle: new Array(),
            errorsForDate: new Array(),
            errorsForCategory: new Array(),
            errorsForBody: new Array(),
            errorsForDescription: new Array()
        };
        if (data["ModelState"]) {
            this.GetFieldErrors("item", data["ModelState"], errorsCreatedNews.errorsGlobalNews);
            this.GetFieldErrors("item.Title", data["ModelState"], errorsCreatedNews.errorsForTitle);
            this.GetFieldErrors("item.Body", data["ModelState"], errorsCreatedNews.errorsForBody);
            this.GetFieldErrors("item.CreatedDate", data["ModelState"], errorsCreatedNews.errorsForDate);
            this.GetFieldErrors("item.Description", data["ModelState"], errorsCreatedNews.errorsForDate);
            this.GetFieldErrors("item.CategoryId", data["ModelState"], errorsCreatedNews.errorsForCategory);
        }
        return errorsCreatedNews;
    };
    ParsingErrorResponse.parsingCreatedCategoryResponse = function (data) {
        var errors = new Array();
        if (data["ModelState"]) {
            this.GetFieldErrors("item", data["ModelState"], errors);
            this.GetFieldErrors("item.Name", data["ModelState"], errors);
            this.GetFieldErrors("item.Active", data["ModelState"], errors);
        }
        return errors;
    };
    ParsingErrorResponse.parsingLoginUser = function (data) {
        var errors = new Array();
        if (data["ModelState"]) {
            this.GetFieldErrors("item", data["ModelState"], errors);
            this.GetFieldErrors("item.Email", data["ModelState"], errors);
            this.GetFieldErrors("item.Password", data["ModelState"], errors);
        }
        return errors;
    };
    ParsingErrorResponse.parsingRegistrationUser = function (data) {
        var errors = new Array();
        if (data["ModelState"]) {
            this.GetFieldErrors("item", data["ModelState"], errors);
            this.GetFieldErrors("item.Email", data["ModelState"], errors);
            this.GetFieldErrors("item.Password", data["ModelState"], errors);
            this.GetFieldErrors("item.Address", data["ModelState"], errors);
            this.GetFieldErrors("item.Name", data["ModelState"], errors);
        }
        return errors;
    };
    ParsingErrorResponse.GetFieldErrors = function (field, data, listErrors) {
        if (data[field]) {
            var errors = data[field];
            for (var i = 0; i < errors.length; i++) {
                var error = new ModelsError_1.ModelErrors();
                error.Field = field.replace("item.", "");
                error.ErrorsMessage.push(errors[i]);
                listErrors.push(error);
            }
        }
    };
    return ParsingErrorResponse;
}());
exports.ParsingErrorResponse = ParsingErrorResponse;
//# sourceMappingURL=ParserErrorResponse.js.map