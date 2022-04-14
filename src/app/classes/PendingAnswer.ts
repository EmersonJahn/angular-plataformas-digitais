export class PendingAnswer {

    public problem_id: Number;
    public answer_id: Number;

    constructor (problemId: Number, answerId: Number) {
        this.problem_id = problemId;
        this.answer_id  = answerId; 
    }

}