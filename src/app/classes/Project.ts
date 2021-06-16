export class Project {

    public id: Number;
    public category_id: Number;
    public title: string;
    public description: string;
    public project_photo: string;

    constructor (id: Number, categoryId: Number, title: string, description: string, projectPhoto: string) {
        this.id            = id;
        this.category_id   = categoryId;
        this.title         = title;
        this.description   = description;
        this.project_photo = projectPhoto;
    }
    
}