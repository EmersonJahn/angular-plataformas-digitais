export class ProjectMember {

    public project_id: Number;
    public person_id: Number;

    constructor(projectId: Number, personId: Number) {
        this.project_id = projectId;
        this.person_id  = personId;
    }

}