import { ModelErrors } from "app/models/ModelsError";

export class ParsingErrorResponse {

    public static parsingCreatedNewsResponse(data: any) {

        let errorsCreatedNews = {

            errorsGlobalNews: new Array<ModelErrors>(),
            errorsForTitle: new Array<ModelErrors>(),
            errorsForDate: new Array<ModelErrors>(),
            errorsForCategory: new Array<ModelErrors>(),
            errorsForBody: new Array<ModelErrors>(),
            errorsForDescription: new Array<ModelErrors>()
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
    }

    public static parsingCreatedCategoryResponse(data: any): Array<ModelErrors> {

        let errors: Array<ModelErrors> = new Array<ModelErrors>();

        if (data["ModelState"]) {

            this.GetFieldErrors("item", data["ModelState"], errors);
            this.GetFieldErrors("item.Name", data["ModelState"], errors);
            this.GetFieldErrors("item.Active", data["ModelState"], errors);
        }

        return errors;
    }

    public static parsingLoginUser(data: any): Array<ModelErrors> {

        let errors: Array<ModelErrors> = new Array<ModelErrors>();

        if (data["ModelState"]) {

            this.GetFieldErrors("item", data["ModelState"], errors);
            this.GetFieldErrors("item.Email", data["ModelState"], errors);
            this.GetFieldErrors("item.Password", data["ModelState"], errors);
        }

        return errors;
    }

    public static parsingRegistrationUser(data: any): Array<ModelErrors> {

        let errors: Array<ModelErrors> = new Array<ModelErrors>();

        if (data["ModelState"]) {

            this.GetFieldErrors("item", data["ModelState"], errors);
            this.GetFieldErrors("item.Email", data["ModelState"], errors);
            this.GetFieldErrors("item.Password", data["ModelState"], errors);
            this.GetFieldErrors("item.Address", data["ModelState"], errors);
            this.GetFieldErrors("item.Name", data["ModelState"], errors);
        }

        return errors;
    }

    private static GetFieldErrors(field: string, data: any, listErrors: Array<ModelErrors>) {

        if (data[field]) {

            let errors = data[field];

            for (let i = 0; i < errors.length; i++) {

                let error = new ModelErrors();
                error.Field = field.replace("item.", "");
                error.ErrorsMessage.push(errors[i]);

                listErrors.push(error);
            }
        }
    }
}