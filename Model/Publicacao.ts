import { Perfil } from "./Perfil"

export class Publicacao {
    private static _idContador = 0
    private _id : number;
    private _conteudo : string;
    private _data : Date;
    private _perfilAssociado : Perfil;

    constructor(conteudo : string , perfil : Perfil){
        this._id = ++Publicacao._idContador;
        this._conteudo  = conteudo;
        this._data = new Date();
        this._perfilAssociado = perfil;
    }
    //getters e setters
    get getId(): number {
        return this._id;
    }

    set setId(id : number) {
        this._id = id;
    }

    get getConteudo(): string{
        return this._conteudo;
    }

    set setConteudo(conteudo : string ){
        this._conteudo = conteudo;
    }

    get getData() : Date {
        return this._data;
    }

    set setData(data : Date) {
        this._data = data;
    }

    get getPerfilAssociado() : Perfil {
        return this._perfilAssociado;
    }

    set setPerfilAssociado(perfil : Perfil) {
        this._perfilAssociado = perfil;
    }
}