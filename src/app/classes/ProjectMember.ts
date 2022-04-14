export class ProjectMember {

    public project_id: Number;
    public person_id: Number;
    public project_owner: boolean;

    constructor(projectId: Number, personId: Number, projectOwner: boolean) {
        this.project_id    = projectId;
        this.person_id     = personId;
        this.project_owner = projectOwner;
    }

}