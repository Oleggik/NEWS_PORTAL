export class HttpQueryStrings {

    public static LoginUser: string = '/api/auth/login';
    public static RegiserUser: string = '/api/auth/register';
    public static IsAuntificated: string = '/api/auth/isauntificated';
    public static UserInRole: string = '/api/auth/isinrole?rolename=';
    public static LogoutUser: string = '/api/auth/logout';

    public static ApiCategory: string = '/api/category/';
    public static ApiNews: string = '/api/news/';
    
    public static GetNewsById: string = '/api/news/?$filter=Id eq ';
    public static ODataCategoriesActive: string = "/api/category/?$filter=Active eq true";
    public static ODataNewsPublished: string = '/api/news/?$inlinecount=allpages&$filter=Published eq true';
    public static GetNewsByCategory: string = '/api/news/?$inlinecount=allpages&$filter=CategoryId eq ';
    public static GetCategoryById: string = '/api/category/?$filter=Id eq '; 
    public static GetCategoryByName: string = "/api/category/?$filter=Name eq '"; 
    public static GetCategoriesElastic: string = '/api/elastic/categories';
    public static GetAllNewsFromElastic: string = '/api/elastic/all?';
    public static GetNewsFromValueElastic: string = '/api/elastic/value?';
    public static GetNewsFromCategoryElastic: string = '/api/elastic/category?';
    public static GetNewsFromCategoryAndValueElastic: string = '/api/elastic/categoryandvalue?';
}