export class CreateNews {

    public Title: string;
    public Body: string;
    public Description: string;
    public Published: boolean = false;
    public CreatedDate: any = new Date();
    public CategoryId: string; 
}