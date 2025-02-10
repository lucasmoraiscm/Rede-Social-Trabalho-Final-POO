"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicacaoAvancada = void 0;
const Publicacao_1 = require("./Publicacao");
class PublicacaoAvancada extends Publicacao_1.Publicacao {
    constructor(conteudo, perfil) {
        super(conteudo, perfil);
        this._listaInteracoes = [];
    }
    // getters e setters
    get getListaInteracao() {
        return this._listaInteracoes;
    }
    set setListaInteracao(listaInteracao) {
        this._listaInteracoes = listaInteracao;
    }
    //metodos
    adicionarInteracao(interacao) {
        this._listaInteracoes.push(interacao);
    }
    listarInteracao() {
        return this.getListaInteracao;
    }
}
exports.PublicacaoAvancada = PublicacaoAvancada;
