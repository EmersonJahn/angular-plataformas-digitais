import { Person } from 'src/app/classes/Person';
import { Category } from 'src/app/classes/Category';
import { ProjectStatus } from './ProjectStatus';

export class Project {

    public id: Number;
    public person: Person;
    public category: Category;
    public title: string;
    public description: string;
    public project_photo: string;
    public project_status: ProjectStatus;

    constructor (id: Number, person: Person, category: Category, title: string, description: string, projectPhoto: string, projectStatus: ProjectStatus) {
        this.id             = id;
        this.person         = person;
        this.category       = category;
        this.title          = title;
        this.description    = description;
        this.project_photo  = projectPhoto;
        this.project_status = projectStatus;
    }
    
}