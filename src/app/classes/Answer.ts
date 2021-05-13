export class Answer {

    public id: Number;
    public problem_id: Number;
    public person_id: Number;
    public answer: string;
    public answer_status_id: Number;
    public right_answer: boolean;

    constructor (id: Number, problemId: Number, personId: Number, answer: string, answeStatusId: Number, rightAnswer: boolean) {
        this.id               = id;
        this.problem_id       = problemId;
        this.person_id        = personId;
        this.answer           = answer;
        this.answer_status_id = answeStatusId;
        this.right_answer     = rightAnswer;
    }

}