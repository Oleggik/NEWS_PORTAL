import { Category } from "app/models/Category";
import { CreateCategory } from "app/models/CreateCategory";
import { CreateNews } from "app/models/CreateNews";
import { ModelErrors } from "app/models/ModelsError";
import { ValidatorNews } from "app/helpers/ValidatorNews";

export class CreateNewsComponentModel {

    
    public errorCreatedCategory: Array<ModelErrors> = new Array<ModelErrors>();

    public validateNews: ValidatorNews = new ValidatorNews();
    
    public categories: Array<Category> = new Array<Category>();

    public createdCategory: CreateCategory = new CreateCategory();
    public createdNews: CreateNews = new CreateNews();

    public toggleAddCategory: boolean = false;

    public creatingItem: boolean = false;  
}