export class PendingAnswer {

    public id: Number;
    public problem_id: Number;
    public answer_id: Number;

    constructor (id: Number, problemId: Number, answerId: Number) {
        this.id         = id;
        this.problem_id = problemId;
        this.answer_id  = answerId; 
    }

}