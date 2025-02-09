import { Perfil } from "./Perfil";

export class PedidoAmizade{
    private _perfilSolicitante : Perfil;
    private _perfilSolicitado : Perfil;

    constructor(perfilSolicitante : Perfil, perfilSolicitado : Perfil){
        this._perfilSolicitante = perfilSolicitante;
        this._perfilSolicitado = perfilSolicitado;
    }

    //getters e setters
    set setPerfilSolicitante(perfilSolicitante : Perfil){
        this._perfilSolicitante = perfilSolicitante
    }

    set setPerfilSolicitado(perfilSolicitado : Perfil){
        this._perfilSolicitado = perfilSolicitado;
    }

    get getPerfilSolicitante() : Perfil {
        return this._perfilSolicitante;
    }

    get getPerfilSolicitado() : Perfil {
        return this._perfilSolicitado;
    }
}