export class Project {

    public category_id: Number;
    public title: string;
    public description: string;
    public project_image: string;

    constructor (categoryId: Number, title: string, description: string, projectImage: string) {
        this.category_id   = categoryId;
        this.title         = title;
        this.description   = description;
        this.project_image = projectImage;
    }
    
}