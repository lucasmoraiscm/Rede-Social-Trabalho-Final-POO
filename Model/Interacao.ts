import { TipoInteracao } from './TipoInteracao'
import { Perfil } from './Perfil'

export class Interacao {
    private static _idContador = 0
    private _id : number;
    private _tipoInteracao : TipoInteracao;
    private _perfilAutor : Perfil;

    constructor(tipo : TipoInteracao, perfil : Perfil){
        this._id = ++Interacao._idContador;
        this._tipoInteracao = tipo;
        this._perfilAutor = perfil;
    }

    //getters e setters
    get getId(): number {
        return this._id;
    }

    set setId(id : number) {
        this._id = id;
    }

    get getTipoInteracao() : TipoInteracao{
        return this._tipoInteracao;
    }

    set setTipoInteracao(tipointeracao : TipoInteracao) {
        this._tipoInteracao = tipointeracao;
    }

    get getPerfilAutor() : Perfil{
        return this._perfilAutor;
    }

    set setPerfilAutor(perfilAutor : Perfil) {
        this._perfilAutor = perfilAutor;
    }

}