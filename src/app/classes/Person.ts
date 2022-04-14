export class Person {

    public id: Number;
    public person_type_id: Number;
    public name: string;
    public cpf: string;
    public cnpj: string;
    public email: string;
    public password: string;
    public profile_photo: string;

    constructor (id: Number, personTypeId: Number, name: string, cpf: string, cnpj: string, email: string, password: string, profilePhoto: string) {
        this.id             = id;
        this.person_type_id = personTypeId;
        this.name           = name;
        this.cpf            = cpf;
        this.cnpj           = cnpj;
        this.email          = email;
        this.password       = password;
        this.profile_photo  = profilePhoto;
    }

}