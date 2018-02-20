import { ModelErrors } from "app/models/ModelsError";

export class ValidatorNews {

    public errors = {

        errorsGlobalNews: new Array<ModelErrors>(),
        errorsForTitle: new Array<ModelErrors>(),
        errorsForDate: new Array<ModelErrors>(),
        errorsForCategory: new Array<ModelErrors>(),
        errorsForDescription: new Array<ModelErrors>(),
        errorsForBody: new Array<ModelErrors>()
    };

    public validTitle: boolean = false;
    public validDescription: boolean = false;
    public validDate: boolean = false;
    public validChooseCategory: boolean = false;
    public validBody: boolean = false;

    public validateTitle(item: any) {

        this.validTitle = false;

        this.errors.errorsForTitle = new Array<ModelErrors>();

        if (item == '' || item == null) {

            let error = new ModelErrors();
            error.Field = "Title";
            error.ErrorsMessage.push("Title is required");
            this.errors.errorsForTitle.push(error);

        } else {

            this.validTitle = true;
        }
    }

    public validateDescription(item: any) {

        this.validDescription = false;

        this.errors.errorsForDescription = new Array<ModelErrors>();

        if (item == '' || item == null) {

            let error = new ModelErrors();
            error.Field = "Description";
            error.ErrorsMessage.push("Description is required");
            this.errors.errorsForDescription.push(error);

        } else {

            this.validDescription = true;
        }
    }

    public validateDate(item: any) {

        this.validDate = false;

        this.errors.errorsForDate = new Array<ModelErrors>();

        if (new Date(item) > (new Date())) {

            let error = new ModelErrors();
            error.Field = "CreatedDate";
            error.ErrorsMessage.push("Date must be less than current");
            this.errors.errorsForDate.push(error);

        } else {

            this.validDate = true;
        }
    }

    public validateCategory(item: any) {

        this.validChooseCategory = false;

        this.errors.errorsForCategory = new Array<ModelErrors>();

        if (item == null) {

            let error = new ModelErrors();
            error.Field = "CategoryId";
            error.ErrorsMessage.push("Category must be choose");
            this.errors.errorsForCategory.push(error);

        } else {

            this.validChooseCategory = true;
        }
    } 

    public validateBody(item: any) {

        this.validBody = false;

        this.errors.errorsForBody = new Array<ModelErrors>();

        if (item == '' || item == null) {

            let error = new ModelErrors();
            error.Field = "Body";
            error.ErrorsMessage.push("Body is required");
            this.errors.errorsForBody.push(error);

        } else {

            this.validBody = true;
        } 
    } 
}