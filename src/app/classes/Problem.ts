import { Person } from "./Person";
import { Category } from "./Category";

export class Problem {

    public id: Number;
    public person: Person;
    public category?: Category;
    public title?: string;
    public description?: string;
    public problem_status_id?: Number;
    public number_answers?: Number;

    constructor (id: Number, person: Person, category?: Category, title?: string, description?: string, problemStatusId?: Number, numberAnswers?: Number) {
        this.id                = id;
        this.person            = person;
        this.category          = category;
        this.title             = title;
        this.description       = description;
        this.problem_status_id = problemStatusId;
        this.number_answers    = numberAnswers;
    }

}