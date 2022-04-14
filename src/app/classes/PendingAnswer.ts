import { Problem } from './Problem';
import { Answer } from 'src/app/classes/Answer';
import { Person } from './Person';

export class PendingAnswer {

    public id: Number;
    public problem: Problem;
    public answer: Answer;

    constructor (id: Number, problem: Problem, answer: Answer) {
        this.id      = id;
        this.problem = problem;
        this.answer  = answer; 
    }

}