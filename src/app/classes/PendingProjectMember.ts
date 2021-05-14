export class PendingProjectMember {

    public project_id: Number;
    public person_id: Number;
    public presentation: string;

    constructor (projectId: Number, personId: Number, presentation: string) {
        this.project_id = projectId;
        this.person_id = personId;
        this.presentation = presentation;
    }

}