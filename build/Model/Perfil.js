"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Perfil = void 0;
class Perfil {
    constructor(apelido, foto, email) {
        this._id = ++Perfil._idContador; //// Incrementa e atribui o ID
        this._apelido = apelido;
        this._foto = foto;
        this._email = email;
        this._status = true;
        this._amizades = [];
        this._postagens = [];
    }
    //getters e setters
    get getId() {
        return this._id;
    }
    set setId(id) {
        this._id = id;
    }
    get getApelido() {
        return this._apelido;
    }
    set setApelido(apelido) {
        this._apelido = apelido;
    }
    get getFoto() {
        return this._foto;
    }
    set setFoto(foto) {
        this._foto = foto;
    }
    get getEmail() {
        return this._email;
    }
    set setEmail(email) {
        this._email = email;
    }
    get getStatus() {
        return this._status;
    }
    set setStatus(status) {
        this._status = status;
    }
    get getAmizades() {
        return this._amizades;
    }
    get getPublicacoes() {
        return this._postagens;
    }
    //metodos
    adicionarAmigo(amigo) {
        this._amizades.push(amigo);
    }
    removerAmigo(amigo) {
        this._amizades = this._amizades.filter((a) => a.getId !== amigo.getId);
    }
    adicionarPublicacao(publicacao) {
        this._postagens.push(publicacao);
    }
    listarAmigos() {
        return [...this._amizades]; ///retorna copia do array para evitar modificaçoes//proteger array interna da classe
    }
    listarPostagens() {
        return [...this._postagens];
    }
    ativarPerfil() {
        this._status = true;
    }
    desativarPerfil() {
        this._status = false;
    }
}
exports.Perfil = Perfil;
Perfil._idContador = 0; //static pertence a classe e nao a uma instância especifica
