import { Person } from 'src/app/classes/Person';

export class PendingProjectMember {

    public id: Number;
    public project_id: Number;
    public person: Person;
    public presentation: string;

    constructor (id: Number, projectId: Number, person: Person, presentation: string) {
        this.id           = id;
        this.project_id   = projectId;
        this.person       = person;
        this.presentation = presentation;
    }

}