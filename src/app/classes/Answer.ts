import { Problem } from "./Problem";
import { Person } from "./Person";

export class Answer {

    public id: Number;
    public problem: Problem;
    public person  : Person;
    public answer: string;
    public answer_status_id: Number;
    public right_answer: boolean;

    constructor (id: Number, problem: Problem, person: Person, answer: string, answerStatusId: Number, rightAnswer: boolean) {
        this.id               = id;
        this.problem          = problem;
        this.person           = person;
        this.answer           = answer;
        this.answer_status_id = answerStatusId;
        this.right_answer     = rightAnswer;
    }

}