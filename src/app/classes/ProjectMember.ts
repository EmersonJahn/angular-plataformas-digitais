import { Person } from "./Person";

export class ProjectMember {

    public project_id: Number;
    public person: Person;

    constructor(projectId: Number, person: Person) {
        this.project_id = projectId;
        this.person     = person;
    }

}