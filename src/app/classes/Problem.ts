export class Problem {

    public id: Number;
    public person_id: Number;
    public category_id: Number;
    public title: string;
    public description: string;
    public problem_status_id: Number;
    public number_answers: Number;

    constructor (id: Number, personId: Number, categoryId: Number, title: string, description: string, problemStatusId: Number, numberAnswers: Number) {
        this.id                = id;
        this.person_id         = personId;
        this.category_id       = categoryId;
        this.title             = title;
        this.description       = description;
        this.problem_status_id = problemStatusId;
        this.number_answers    = numberAnswers;
    }

}