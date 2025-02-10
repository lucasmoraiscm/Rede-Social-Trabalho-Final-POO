"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeSocial = void 0;
const Publicacao_1 = require("../Model/Publicacao");
const PublicacaoAvancada_1 = require("../Model/PublicacaoAvancada");
const PedidoAmizade_1 = require("../Model/PedidoAmizade");
const Interacao_1 = require("../Model/Interacao");
const Validacoes_1 = require("../Controller/Validacoes");
class RedeSocial {
    constructor() {
        this._perfis = [];
        this._publicacoes = [];
        this._solicitacoesAmizades = [];
    }
    //getters e setters
    get getPerfis() {
        return this._perfis;
    }
    set setPerfis(perfis) {
        this._perfis = perfis;
    }
    get getPublicacoes() {
        return this._publicacoes;
    }
    set setPublicacoes(publicacoes) {
        this._publicacoes = publicacoes;
    }
    get getSolicitacoes() {
        return this._solicitacoesAmizades;
    }
    set setSolicitacoes(solicitacoes) {
        this._solicitacoesAmizades = solicitacoes;
    }
    //metodos
    //gerenciamento de perfil
    adicionarPerfil(perfil) {
        this._perfis.push(perfil);
    }
    buscarPerfilPorEmail(email) {
        let perfis = this.getPerfis;
        perfis = perfis.filter(perfil => perfil.getEmail == email);
        if (perfis[0]) {
            return perfis[0];
        }
        else {
            throw new Validacoes_1.PerfilNaoEncontradoError('Perfil não encontrado!');
        }
    }
    buscarPerfilPorApelido(apelido) {
        let perfis = this.getPerfis;
        perfis = perfis.filter(perfil => perfil.getApelido == apelido);
        if (perfis[0]) {
            return perfis[0];
        }
        else {
            throw new Validacoes_1.PerfilNaoEncontradoError('Perfil não encontrado!');
        }
    }
    buscarPerfilPorId(id) {
        let perfis = this.getPerfis;
        perfis = perfis.filter(perfil => perfil.getId == id);
        if (perfis[0]) {
            return perfis[0];
        }
        else {
            throw new Validacoes_1.PerfilNaoEncontradoError('Perfil não encontrado!');
        }
    }
    listarPerfis() {
        return this.getPerfis;
    }
    ativarPerfil(perfilAvancado, perfil) {
        if (perfil.getStatus == false) {
            perfilAvancado.habilitarPefil(perfil);
        }
        else {
            throw new Validacoes_1.PerfilAtivadoError('O perfil já está ativado!');
        }
    }
    desativarPerfil(perfilAvancado, perfil) {
        if (perfil.getStatus == true) {
            perfilAvancado.desabilitarPerfil(perfil);
        }
        else {
            throw new Validacoes_1.PerfilDesativadoError('O perfil já está desativado!');
        }
    }
    //gerenciamento de publicacoes
    adicionarPublicacaoSimples(conteudo, perfil) {
        let publicacao = new Publicacao_1.Publicacao(conteudo, perfil);
        perfil.adicionarPublicacao(publicacao);
        this._publicacoes.push(publicacao);
    }
    adicionarPublicacaoAvancada(conteudo, perfil) {
        let publicacao = new PublicacaoAvancada_1.PublicacaoAvancada(conteudo, perfil);
        perfil.adicionarPublicacao(publicacao);
        this._publicacoes.push(publicacao);
    }
    listarPublicacoes() {
        let publicacoes = this.getPublicacoes;
        publicacoes.sort((a, b) => b.getData.getTime() - a.getData.getTime());
        if (publicacoes.length > 0) {
            return publicacoes;
        }
        else {
            throw new Validacoes_1.PublicacaoNaoEncontradaError('Nenhuma publicação encontrada!');
        }
    }
    listarPublicacoesComFiltro(perfil) {
        let publicacoes = this.getPublicacoes;
        let publicacoesFiltradas = [];
        for (let publicacao of publicacoes) {
            if (publicacao.getPerfilAssociado == perfil) {
                publicacoesFiltradas.push(publicacao);
            }
        }
        publicacoesFiltradas.sort((a, b) => b.getData.getTime() - a.getData.getTime());
        if (publicacoesFiltradas.length > 0) {
            return publicacoesFiltradas;
        }
        else {
            throw new Validacoes_1.PublicacaoNaoEncontradaError('Nenhuma publicação foi encontrada!');
        }
    }
    //gerenciamento de solicitaçoes
    enviarSolicitacaoAmizade(perfilSolicitante, perfilSolicitado) {
        this._solicitacoesAmizades.push(new PedidoAmizade_1.PedidoAmizade(perfilSolicitante, perfilSolicitado));
    }
    aceitarSolicitacao(perfilSolicitante, perfilSolicitado) {
        let solicitacoes = this.getSolicitacoes;
        solicitacoes = solicitacoes.filter(solicitacao => solicitacao.getPerfilSolicitante != perfilSolicitante &&
            solicitacao.getPerfilSolicitado != perfilSolicitado);
        perfilSolicitante.adicionarAmigo(perfilSolicitado);
        perfilSolicitado.adicionarAmigo(perfilSolicitante);
        this._solicitacoesAmizades = solicitacoes;
    }
    recusarSolicitacao(perfilSolicitante, perfilSolicitado) {
        let solicitacoes = this.getSolicitacoes;
        solicitacoes = solicitacoes.filter(solicitacao => solicitacao.getPerfilSolicitante != perfilSolicitante &&
            solicitacao.getPerfilSolicitado != perfilSolicitado);
        this._solicitacoesAmizades = solicitacoes;
    }
    solicitacoesParaPerfil(perfilSolicitado) {
        let solicitacoes = this.getSolicitacoes;
        solicitacoes = solicitacoes.filter(solicitacao => solicitacao.getPerfilSolicitado == perfilSolicitado);
        return solicitacoes;
    }
    //gerenciamento de interaçoes
    adicionarInteracao(tipo, perfil, publicacao) {
        publicacao.adicionarInteracao(new Interacao_1.Interacao(tipo, perfil));
    }
}
exports.RedeSocial = RedeSocial;
