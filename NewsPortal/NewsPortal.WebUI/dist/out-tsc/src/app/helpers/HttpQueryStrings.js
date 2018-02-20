"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpQueryStrings = /** @class */ (function () {
    function HttpQueryStrings() {
    }
    HttpQueryStrings.LoginUser = '/api/auth/login';
    HttpQueryStrings.RegiserUser = '/api/auth/register';
    HttpQueryStrings.IsAuntificated = '/api/auth/isauntificated';
    HttpQueryStrings.UserInRole = '/api/auth/isinrole?rolename=';
    HttpQueryStrings.LogoutUser = '/api/auth/logout';
    HttpQueryStrings.ApiCategory = '/api/category/';
    HttpQueryStrings.ApiNews = '/api/news/';
    HttpQueryStrings.GetNewsById = '/api/news/?$filter=Id eq ';
    HttpQueryStrings.ODataCategoriesActive = "/api/category/?$filter=Active eq true";
    HttpQueryStrings.ODataNewsPublished = '/api/news/?$inlinecount=allpages&$filter=Published eq true';
    HttpQueryStrings.GetNewsByCategory = '/api/news/?$inlinecount=allpages&$filter=CategoryId eq ';
    HttpQueryStrings.GetCategoryById = '/api/category/?$filter=Id eq ';
    HttpQueryStrings.GetCategoryByName = "/api/category/?$filter=Name eq '";
    HttpQueryStrings.GetCategoriesElastic = '/api/elastic/categories';
    HttpQueryStrings.GetAllNewsFromElastic = '/api/elastic/all?';
    HttpQueryStrings.GetNewsFromValueElastic = '/api/elastic/value?';
    HttpQueryStrings.GetNewsFromCategoryElastic = '/api/elastic/category?';
    HttpQueryStrings.GetNewsFromCategoryAndValueElastic = '/api/elastic/categoryandvalue?';
    return HttpQueryStrings;
}());
exports.HttpQueryStrings = HttpQueryStrings;
//# sourceMappingURL=HttpQueryStrings.js.map