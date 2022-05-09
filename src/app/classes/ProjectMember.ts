import { Person } from "./Person";

export class ProjectMember {

    public id: Number;
    public project_id: Number;
    public person: Person;

    constructor(id: Number, projectId: Number, person: Person) {
        this.id         = id;
        this.project_id = projectId;
        this.person     = person;
    }

}