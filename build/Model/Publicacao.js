"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publicacao = void 0;
class Publicacao {
    constructor(conteudo, perfil) {
        this._id = ++Publicacao._idContador;
        this._conteudo = conteudo;
        this._data = new Date();
        this._perfilAssociado = perfil;
    }
    //getters e setters
    get getId() {
        return this._id;
    }
    set setId(id) {
        this._id = id;
    }
    get getConteudo() {
        return this._conteudo;
    }
    set setConteudo(conteudo) {
        this._conteudo = conteudo;
    }
    get getData() {
        return this._data;
    }
    set setData(data) {
        this._data = data;
    }
    get getPerfilAssociado() {
        return this._perfilAssociado;
    }
    set setPerfilAssociado(perfil) {
        this._perfilAssociado = perfil;
    }
}
exports.Publicacao = Publicacao;
Publicacao._idContador = 0;
