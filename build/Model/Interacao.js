"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interacao = void 0;
class Interacao {
    constructor(tipo, perfil) {
        this._id = ++Interacao._idContador;
        this._tipoInteracao = tipo;
        this._perfilAutor = perfil;
    }
    //getters e setters
    get getId() {
        return this._id;
    }
    set setId(id) {
        this._id = id;
    }
    get getTipoInteracao() {
        return this._tipoInteracao;
    }
    set setTipoInteracao(tipointeracao) {
        this._tipoInteracao = tipointeracao;
    }
    get getPerfilAutor() {
        return this._perfilAutor;
    }
    set setPerfilAutor(perfilAutor) {
        this._perfilAutor = perfilAutor;
    }
}
exports.Interacao = Interacao;
Interacao._idContador = 0;
