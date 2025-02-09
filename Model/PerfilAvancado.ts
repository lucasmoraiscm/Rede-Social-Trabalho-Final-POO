import { Perfil } from "./Perfil";


export class PerfilAvancado extends Perfil {

    constructor(apelido : string , foto : string , email : string){
        super(apelido, foto, email); //herdando atributos da classe base
    }

    //metodos
    public habilitarPefil(perfil : Perfil){
        perfil.setStatus = true;
    }

    public desabilitarPerfil(perfil : Perfil){
        perfil.setStatus = false;
    }
}