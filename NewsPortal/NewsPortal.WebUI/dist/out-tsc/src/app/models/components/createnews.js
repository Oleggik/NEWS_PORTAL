"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateCategory_1 = require("app/models/CreateCategory");
var CreateNews_1 = require("app/models/CreateNews");
var ValidatorNews_1 = require("app/helpers/ValidatorNews");
var CreateNewsComponentModel = /** @class */ (function () {
    function CreateNewsComponentModel() {
        this.errorCreatedCategory = new Array();
        this.validateNews = new ValidatorNews_1.ValidatorNews();
        this.categories = new Array();
        this.createdCategory = new CreateCategory_1.CreateCategory();
        this.createdNews = new CreateNews_1.CreateNews();
        this.toggleAddCategory = false;
        this.creatingItem = false;
    }
    return CreateNewsComponentModel;
}());
exports.CreateNewsComponentModel = CreateNewsComponentModel;
//# sourceMappingURL=createnews.js.map