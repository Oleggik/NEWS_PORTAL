"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelsError_1 = require("app/models/ModelsError");
var ValidatorNews = /** @class */ (function () {
    function ValidatorNews() {
        this.errors = {
            errorsGlobalNews: new Array(),
            errorsForTitle: new Array(),
            errorsForDate: new Array(),
            errorsForCategory: new Array(),
            errorsForDescription: new Array(),
            errorsForBody: new Array()
        };
        this.validTitle = false;
        this.validDescription = false;
        this.validDate = false;
        this.validChooseCategory = false;
        this.validBody = false;
    }
    ValidatorNews.prototype.validateTitle = function (item) {
        this.validTitle = false;
        this.errors.errorsForTitle = new Array();
        if (item == '' || item == null) {
            var error = new ModelsError_1.ModelErrors();
            error.Field = "Title";
            error.ErrorsMessage.push("Title is required");
            this.errors.errorsForTitle.push(error);
        }
        else {
            this.validTitle = true;
        }
    };
    ValidatorNews.prototype.validateDescription = function (item) {
        this.validDescription = false;
        this.errors.errorsForDescription = new Array();
        if (item == '' || item == null) {
            var error = new ModelsError_1.ModelErrors();
            error.Field = "Description";
            error.ErrorsMessage.push("Description is required");
            this.errors.errorsForDescription.push(error);
        }
        else {
            this.validDescription = true;
        }
    };
    ValidatorNews.prototype.validateDate = function (item) {
        this.validDate = false;
        this.errors.errorsForDate = new Array();
        if (new Date(item) > (new Date())) {
            var error = new ModelsError_1.ModelErrors();
            error.Field = "CreatedDate";
            error.ErrorsMessage.push("Date must be less than current");
            this.errors.errorsForDate.push(error);
        }
        else {
            this.validDate = true;
        }
    };
    ValidatorNews.prototype.validateCategory = function (item) {
        this.validChooseCategory = false;
        this.errors.errorsForCategory = new Array();
        if (item == null) {
            var error = new ModelsError_1.ModelErrors();
            error.Field = "CategoryId";
            error.ErrorsMessage.push("Category must be choose");
            this.errors.errorsForCategory.push(error);
        }
        else {
            this.validChooseCategory = true;
        }
    };
    ValidatorNews.prototype.validateBody = function (item) {
        this.validBody = false;
        this.errors.errorsForBody = new Array();
        if (item == '' || item == null) {
            var error = new ModelsError_1.ModelErrors();
            error.Field = "Body";
            error.ErrorsMessage.push("Body is required");
            this.errors.errorsForBody.push(error);
        }
        else {
            this.validBody = true;
        }
    };
    return ValidatorNews;
}());
exports.ValidatorNews = ValidatorNews;
//# sourceMappingURL=ValidatorNews.js.map