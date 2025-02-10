"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const fs = __importStar(require("fs"));
const RedeSocial_1 = require("./Controller/RedeSocial");
const Perfil_1 = require("./Model/Perfil");
const PerfilAvancado_1 = require("./Model/PerfilAvancado");
const interface_1 = require("./View/interface");
const Publicacao_1 = require("./Model/Publicacao");
const PublicacaoAvancada_1 = require("./Model/PublicacaoAvancada");
const PedidoAmizade_1 = require("./Model/PedidoAmizade");
const Interacao_1 = require("./Model/Interacao");
const TipoInteracao_1 = require("./Model/TipoInteracao");
const emojiConverter_1 = require("./Model/emojiConverter");
const utils_1 = require("./Utils/utils");
const Validacoes_1 = require("./Controller/Validacoes");
class App {
    constructor() {
        this._input = (0, prompt_sync_1.default)();
        this._redeSocial = new RedeSocial_1.RedeSocial();
        this._interface = new interface_1.InterfaceRedeSocial();
        this._utils = new utils_1.Utils();
        try {
            this.carregarDados();
        }
        catch (e) {
            console.log("Erro ao carregar contas.");
        }
    }
    set setPerfilLogado(perfil) {
        this._perfilLogado = perfil;
    }
    menuInicial() {
        let opcao = '';
        do {
            try {
                console.log(this._interface.imprimirMenuInicial());
                opcao = this._input("Opção: ");
                switch (opcao.toLowerCase()) {
                    case "1":
                        this.cadastrarPerfil();
                        break;
                    case "2":
                        this._utils.linha();
                        console.log('Entrar');
                        this._utils.linha();
                        let email = this._input('Digite o email cadastrado: ');
                        Validacoes_1.Validador.validarStringVazia(email);
                        let perfil = this._redeSocial.buscarPerfilPorEmail(email);
                        this._perfilLogado = perfil;
                        this.menuFuncionalidades();
                        break;
                    case "0":
                        this.salvarDados();
                        console.log("Saindo...");
                        break;
                    default:
                        console.log("Opção inválida!");
                }
            }
            catch (e) {
                if (e instanceof Validacoes_1.AplicacaoError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro inesperado. Contate o suporte.");
                }
            }
            this._input("Pressione <Enter> para continuar.");
        } while (opcao != "0");
        console.log("Aplicação encerrada.");
    }
    menuFuncionalidades() {
        let opcao = '';
        do {
            try {
                console.log(this._interface.imprimirMenuInterface(this._perfilLogado.getApelido));
                opcao = this._input("Opção: ");
                switch (opcao.toLowerCase()) {
                    case "1":
                        this.buscarPerfil();
                        break;
                    case "2":
                        this.listarPerfis();
                        break;
                    case "3":
                        this.ativarDesativarPerfil();
                        break;
                    case "4":
                        this.adicionarPublicacao();
                        break;
                    case "5":
                        this.listarPublicacoes();
                        break;
                    case "6":
                        this.enviarSolicitacaoAmizade();
                        break;
                    case "7":
                        this.aceitarSolicitacao();
                        break;
                    case "8":
                        this.recusarSolicitacao();
                        break;
                    case "9":
                        this.adicionarInteracao();
                        break;
                    case "0":
                        console.log("Saindo...");
                        break;
                    default:
                        console.log("Opção inválida!");
                }
            }
            catch (e) {
                if (e instanceof Validacoes_1.AplicacaoError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro inesperado. Contate o suporte.");
                }
            }
            this._input("Pressione <Enter> para continuar.");
        } while (opcao != "0");
    }
    cadastrarPerfil() {
        let opcaoCadastrarPerfil = '';
        do {
            try {
                console.log(this._interface.imprimirCadastrarPerfil());
                opcaoCadastrarPerfil = this._input('Digite o número da opção: ');
                switch (opcaoCadastrarPerfil.toLowerCase()) {
                    case "1":
                        this._utils.linha();
                        console.log('Cadastrar Perfil - Comum');
                        this._utils.linha();
                        let apelido = this._input('Digite o apelido: ');
                        Validacoes_1.Validador.validarStringVazia(apelido);
                        this.exibirEmojis();
                        let numeroEmoji = Number(this._input('Digite o número do emoji desejado: '));
                        Validacoes_1.Validador.validarNumero(numeroEmoji);
                        let foto = this.escolherEmoji(numeroEmoji);
                        Validacoes_1.Validador.validarStringVazia(foto);
                        let email = this._input('Digite o email: ');
                        Validacoes_1.Validador.validarStringVazia(email);
                        this.jaCadastrado(email);
                        this._utils.confirmacao();
                        this._redeSocial.adicionarPerfil(new Perfil_1.Perfil(apelido, foto, email));
                        console.log('Perfil cadastrado com sucesso!');
                        break;
                    case "2":
                        this._utils.linha();
                        console.log('Cadastrar Perfil - Avançado');
                        this._utils.linha();
                        let senha = this._input('Digite a senha de acesso: ');
                        Validacoes_1.Validador.validarStringVazia(senha);
                        if (this.permitirAcesso(senha)) {
                            let apelido = this._input('Digite o apelido: ');
                            Validacoes_1.Validador.validarStringVazia(apelido);
                            this.exibirEmojis();
                            let numeroEmoji = Number(this._input('Digite o número do emoji desejado: '));
                            Validacoes_1.Validador.validarNumero(numeroEmoji);
                            let foto = this.escolherEmoji(numeroEmoji);
                            Validacoes_1.Validador.validarStringVazia(foto);
                            let email = this._input('Digite o email: ');
                            Validacoes_1.Validador.validarStringVazia(email);
                            this.jaCadastrado(email);
                            this._utils.confirmacao();
                            this._redeSocial.adicionarPerfil(new PerfilAvancado_1.PerfilAvancado(apelido, foto, email));
                            console.log('Perfil cadastrado com sucesso!');
                        }
                        else {
                            console.log('Senha incorreta! Acesso negado.');
                        }
                        break;
                    case "0":
                        console.log("Saindo...");
                        break;
                    default:
                        console.log("Opção inválida!");
                }
            }
            catch (e) {
                if (e instanceof Validacoes_1.AplicacaoError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro inesperado. Contate o suporte.");
                }
            }
            this._input("Pressione <Enter> para continuar.");
        } while (opcaoCadastrarPerfil != "0");
    }
    exibirEmojis() {
        let emojis = new emojiConverter_1.EmojiConverter();
        emojis.lerEmoji().forEach((emoji, index) => {
            console.log(`${index + 1}. ${emoji}`);
        });
    }
    escolherEmoji(numero) {
        let emojis = new emojiConverter_1.EmojiConverter();
        const listaEmojis = emojis.lerEmoji();
        if (numero < 1 || numero > listaEmojis.length) {
            throw new Validacoes_1.NumeroEmojiIncorretoError("Número inválido! Escolha um número entre 1 e " + listaEmojis.length);
        }
        return listaEmojis[numero - 1];
    }
    permitirAcesso(senha) {
        if (senha == '1234') {
            return true;
        }
        return false;
    }
    buscarPerfil() {
        let perfilBuscado;
        let opcaoBuscarPerfil = '';
        do {
            try {
                console.log(this._interface.imprimirBuscarPerfil());
                opcaoBuscarPerfil = this._input('Digite o número da opção: ');
                switch (opcaoBuscarPerfil.toLowerCase()) {
                    case "1":
                        this._utils.estaAtivo(this._perfilLogado);
                        this._utils.linha();
                        console.log('Buscar por Email');
                        this._utils.linha();
                        let email = this._input('Digite o email: ');
                        Validacoes_1.Validador.validarStringVazia(email);
                        perfilBuscado = this._redeSocial.buscarPerfilPorEmail(email);
                        console.log('Dados do perfil:');
                        this.exibirDadosPerfil(perfilBuscado);
                        break;
                    case "2":
                        this._utils.estaAtivo(this._perfilLogado);
                        this._utils.linha();
                        console.log('Buscar por Apelido');
                        this._utils.linha();
                        let apelido = this._input('Digite o apelido: ');
                        Validacoes_1.Validador.validarStringVazia(apelido);
                        perfilBuscado = this._redeSocial.buscarPerfilPorApelido(apelido);
                        console.log('Dados do perfil:');
                        this.exibirDadosPerfil(perfilBuscado);
                        break;
                    case "3":
                        this._utils.estaAtivo(this._perfilLogado);
                        this._utils.linha();
                        console.log('Buscar por ID');
                        this._utils.linha();
                        let id = Number(this._input('Digite o ID: '));
                        Validacoes_1.Validador.validarNumero(id);
                        perfilBuscado = this._redeSocial.buscarPerfilPorId(id);
                        console.log('Dados do perfil:');
                        this.exibirDadosPerfil(perfilBuscado);
                        break;
                    case "0":
                        console.log("Saindo...");
                        break;
                    default:
                        console.log("Opção inválida!");
                }
            }
            catch (e) {
                if (e instanceof Validacoes_1.AplicacaoError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro inesperado. Contate o suporte.");
                }
            }
            this._input("Pressione <Enter> para continuar.");
        } while (opcaoBuscarPerfil != "0");
    }
    exibirDadosPerfil(perfil) {
        console.log(`\nID: ${perfil.getId}`);
        console.log(`Apelido: ${perfil.getApelido}`);
        console.log(`Foto: ${perfil.getFoto}`);
        console.log(`Email: ${perfil.getEmail}`);
        console.log('Amizades: ');
        if (perfil.getAmizades.length > 0) {
            let amizades = perfil.getAmizades;
            for (let amizade of amizades) {
                console.log(`${amizade.getFoto} - ${amizade.getApelido}`);
            }
        }
        console.log('Publicações:');
        if (perfil.getPublicacoes.length > 0) {
            let publicacoes = perfil.getPublicacoes;
            for (let publicacao of publicacoes) {
                console.log(`${publicacao.getConteudo} - ${publicacao.getData}`);
            }
        }
    }
    listarPerfis() {
        this._utils.estaAtivo(this._perfilLogado);
        this._utils.linha();
        console.log('Listar Todos os Perfis');
        this._utils.linha();
        let listaPerfis = this._redeSocial.listarPerfis();
        for (let perfil of listaPerfis) {
            this.exibirDadosPerfil(perfil);
        }
    }
    ativarDesativarPerfil() {
        if (this._perfilLogado instanceof PerfilAvancado_1.PerfilAvancado) {
            let perfil;
            let opcaoAtivarDesativarPerfil = '';
            do {
                try {
                    console.log(this._interface.ImprimirAtivarDesativarPerfil());
                    opcaoAtivarDesativarPerfil = this._input('Digite o número da opção: ');
                    switch (opcaoAtivarDesativarPerfil.toLowerCase()) {
                        case "1":
                            this._utils.estaAtivo(this._perfilLogado);
                            this._utils.linha();
                            console.log('Ativar Perfil');
                            this._utils.linha();
                            perfil = this.escolherPerfil();
                            this._utils.confirmacao();
                            this._redeSocial.ativarPerfil(this._perfilLogado, perfil);
                            console.log('Perfil ativado com sucesso!');
                            break;
                        case "2":
                            this._utils.estaAtivo(this._perfilLogado);
                            this._utils.linha();
                            console.log('Desativar Perfil');
                            this._utils.linha();
                            perfil = this.escolherPerfil();
                            this._utils.confirmacao();
                            this._redeSocial.desativarPerfil(this._perfilLogado, perfil);
                            console.log('Perfil desativado com sucesso!');
                            break;
                        case "0":
                            console.log("Saindo...");
                            break;
                        default:
                            console.log("Opção inválida!");
                    }
                }
                catch (e) {
                    if (e instanceof Validacoes_1.AplicacaoError) {
                        console.log(e.message);
                    }
                    else {
                        console.log("Erro inesperado. Contate o suporte.");
                    }
                }
                this._input("Pressione <Enter> para continuar.");
            } while (opcaoAtivarDesativarPerfil != "0");
        }
        else {
            throw new Validacoes_1.PerfilNaoAutorizadoError('Perfil não autorizado!');
        }
    }
    escolherPerfil() {
        console.log('Perfis:');
        let perfis = this._redeSocial.getPerfis;
        if (perfis.length > 1) {
            for (let perfil of perfis) {
                if (perfil != this._perfilLogado) {
                    this.exibirDadosPerfil(perfil);
                }
            }
        }
        else {
            throw new Validacoes_1.PerfilNaoEncontradoError('Nenhum perfil foi encontrado!');
        }
        let idPerfil = Number(this._input('Digite o ID do Perfil: '));
        Validacoes_1.Validador.validarNumero(idPerfil);
        let perfilEscolhido = this._redeSocial.buscarPerfilPorId(idPerfil);
        return perfilEscolhido;
    }
    adicionarPublicacao() {
        let conteudo;
        let opcaoAdicionarPublicacao = '';
        do {
            try {
                console.log(this._interface.ImprimirAdicionarPublicacao());
                opcaoAdicionarPublicacao = this._input('Digite o número da opção: ');
                switch (opcaoAdicionarPublicacao.toLowerCase()) {
                    case "1":
                        this._utils.estaAtivo(this._perfilLogado);
                        this._utils.linha();
                        console.log('Adicionar Publicação Simples');
                        this._utils.linha();
                        conteudo = this._input('Digite o conteúdo: ');
                        Validacoes_1.Validador.validarStringVazia(conteudo);
                        this._utils.confirmacao();
                        this._redeSocial.adicionarPublicacaoSimples(conteudo, this._perfilLogado);
                        console.log('Publicação adicionada com sucesso!');
                        break;
                    case "2":
                        this._utils.estaAtivo(this._perfilLogado);
                        this._utils.linha();
                        console.log('Adicionar Publicação Avançada');
                        this._utils.linha();
                        conteudo = this._input('Digite o conteúdo: ');
                        Validacoes_1.Validador.validarStringVazia(conteudo);
                        this._utils.confirmacao();
                        this._redeSocial.adicionarPublicacaoAvancada(conteudo, this._perfilLogado);
                        console.log('Publicação adicionada com sucesso!');
                        break;
                    case "0":
                        console.log("Saindo...");
                        break;
                    default:
                        console.log("Opção inválida!");
                }
            }
            catch (e) {
                if (e instanceof Validacoes_1.AplicacaoError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro inesperado. Contate o suporte.");
                }
            }
            this._input("Pressione <Enter> para continuar.");
        } while (opcaoAdicionarPublicacao != "0");
    }
    listarPublicacoes() {
        let listarPublicacoes;
        let opcaoListarPublicacoes = '';
        do {
            try {
                console.log(this._interface.imprimirListarPublicacao());
                opcaoListarPublicacoes = this._input('Digite o número da opção: ');
                switch (opcaoListarPublicacoes.toLowerCase()) {
                    case "1":
                        this._utils.estaAtivo(this._perfilLogado);
                        this._utils.linha();
                        console.log('Ver Postagens - Geral');
                        this._utils.linha();
                        listarPublicacoes = this._redeSocial.listarPublicacoes();
                        this.exibirPublicacoes(listarPublicacoes);
                        break;
                    case "2":
                        this._utils.estaAtivo(this._perfilLogado);
                        this._utils.linha();
                        console.log('Ver Postagens - Perfil');
                        this._utils.linha();
                        let perfil = this.escolherPerfil();
                        listarPublicacoes = this._redeSocial.listarPublicacoesComFiltro(perfil);
                        this.exibirPublicacoes(listarPublicacoes);
                        break;
                    case "0":
                        console.log("Saindo...");
                        break;
                    default:
                        console.log("Opção inválida!");
                }
            }
            catch (e) {
                if (e instanceof Validacoes_1.AplicacaoError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro inesperado. Contate o suporte.");
                }
            }
            this._input("Pressione <Enter> para continuar.");
        } while (opcaoListarPublicacoes != "0");
    }
    exibirPublicacoes(publicacoes) {
        console.log('Publicações:');
        for (let publicacao of publicacoes) {
            console.log(`\nID: ${publicacao.getId}`);
            console.log(`Conteúdo: ${publicacao.getConteudo}`);
            console.log(`Data: ${publicacao.getData}`);
            console.log(`Usuário: ${publicacao.getPerfilAssociado.getApelido}`);
            if (publicacao instanceof PublicacaoAvancada_1.PublicacaoAvancada) {
                if (publicacao.getListaInteracao.length > 0) {
                    let interacoes = publicacao.getListaInteracao;
                    console.log('Interações: ');
                    for (let interacao of interacoes) {
                        console.log(`${interacao.getPerfilAutor.getApelido} - ${interacao.getTipoInteracao}`);
                    }
                }
            }
        }
    }
    exibirPublicacoesAvancadas(publicacoes) {
        console.log('Publicações:');
        for (let publicacao of publicacoes) {
            if (publicacao instanceof PublicacaoAvancada_1.PublicacaoAvancada) {
                console.log(`\nID: ${publicacao.getId}`);
                console.log(`Conteúdo: ${publicacao.getConteudo}`);
                console.log(`Data: ${publicacao.getData}`);
                console.log(`Usuário: ${publicacao.getPerfilAssociado.getApelido}`);
                if (publicacao.getListaInteracao.length > 0) {
                    let interacoes = publicacao.getListaInteracao;
                    console.log('Interações: ');
                    for (let interacao of interacoes) {
                        console.log(`${interacao.getPerfilAutor.getApelido} - ${interacao.getTipoInteracao}`);
                    }
                }
            }
        }
    }
    buscarPublicacaoAvancada(id) {
        let publicacoes = this._redeSocial.getPublicacoes;
        let publicacaoBuscada;
        for (let publicacao of publicacoes) {
            if (publicacao instanceof PublicacaoAvancada_1.PublicacaoAvancada && publicacao.getId == id) {
                publicacaoBuscada = publicacao;
                return publicacaoBuscada;
            }
        }
        if (publicacaoBuscada) {
            return publicacaoBuscada;
        }
        else {
            throw new Validacoes_1.PublicacaoNaoEncontradaError('Publicação não encontrada!');
        }
    }
    enviarSolicitacaoAmizade() {
        this._utils.estaAtivo(this._perfilLogado);
        this._utils.linha();
        console.log('Enviar Solicitação de Amizade');
        this._utils.linha();
        let perfil = this.escolherPerfil();
        this.existeAmizade(perfil);
        this.existeSolicitacaoEspecifica(perfil);
        this._utils.confirmacao();
        this._redeSocial.enviarSolicitacaoAmizade(this._perfilLogado, perfil);
        console.log('Solicitação enviada com sucesso!');
    }
    aceitarSolicitacao() {
        this._utils.estaAtivo(this._perfilLogado);
        this._utils.linha();
        console.log('Aceitar Solicitação de Amizade');
        this._utils.linha();
        this.existeSolicitacoesPendentes(this._perfilLogado);
        let solicitacaoEscolhida = this.escolherSolicitacao();
        this._utils.confirmacao();
        this._redeSocial.aceitarSolicitacao(solicitacaoEscolhida.getPerfilSolicitante, this._perfilLogado);
        console.log('Solicitação aceita com sucesso!');
    }
    recusarSolicitacao() {
        this._utils.estaAtivo(this._perfilLogado);
        this._utils.linha();
        console.log('Recusar Solicitação de Amizade');
        this._utils.linha();
        this.existeSolicitacoesPendentes(this._perfilLogado);
        let solicitacaoEscolhida = this.escolherSolicitacao();
        this._utils.confirmacao();
        this._redeSocial.recusarSolicitacao(solicitacaoEscolhida.getPerfilSolicitante, this._perfilLogado);
        console.log('Solicitação recusada com sucesso!');
    }
    listarSolicitacoes(solicitacoes) {
        let cont = 1;
        console.log('Solicitações pendentes:');
        for (let solicitacao of solicitacoes) {
            console.log(`${cont}. ${solicitacao.getPerfilSolicitante.getFoto} - ${solicitacao.getPerfilSolicitante.getApelido} `);
            cont++;
        }
    }
    escolherSolicitacao() {
        let solicitacoes = this._redeSocial.solicitacoesParaPerfil(this._perfilLogado);
        this.listarSolicitacoes(solicitacoes);
        let numeroPerfil = Number(this._input('Digite o número da solicitação que deseja escolher: '));
        Validacoes_1.Validador.validarNumero(numeroPerfil);
        let solicitacaoEscolhida = solicitacoes[numeroPerfil - 1];
        if (solicitacaoEscolhida) {
            return solicitacaoEscolhida;
        }
        else {
            throw new Validacoes_1.SolicitacaoNaoEncontradaError('A solicitação não foi encontrada!');
        }
    }
    existeAmizade(perfil) {
        let amizades = this._perfilLogado.getAmizades;
        for (let amizade of amizades) {
            if (amizade == perfil) {
                throw new Validacoes_1.AmizadeJaExistenteError('O usuário já é amigo desse perfil!');
            }
        }
    }
    existeSolicitacaoEspecifica(perfil) {
        let solicitacoes = this._redeSocial.getSolicitacoes;
        for (let solicitacao of solicitacoes) {
            if (solicitacao.getPerfilSolicitante == this._perfilLogado && solicitacao.getPerfilSolicitado == perfil) {
                throw new Validacoes_1.SolicitacaoJaExistenteError('O usuário já enviou uma solicitação para esse perfil!');
            }
            else if (solicitacao.getPerfilSolicitante == perfil && solicitacao.getPerfilSolicitado == this._perfilLogado) {
                throw new Validacoes_1.SolicitacaoJaExistenteError('O perfil já enviou uma solicitação para você!');
            }
        }
    }
    existeSolicitacoesPendentes(perfil) {
        let solicitacoes = this._redeSocial.getSolicitacoes;
        for (let solicitacao of solicitacoes) {
            if (solicitacao.getPerfilSolicitado == perfil) {
                return true;
            }
        }
        throw new Validacoes_1.SolicitacaoNaoEncontradaError('Nenhuma solicitação foi encontrada!');
    }
    adicionarInteracao() {
        this._utils.estaAtivo(this._perfilLogado);
        this._utils.linha();
        console.log('Adicionar Interação');
        this._utils.linha();
        let publicacoes = this._redeSocial.listarPublicacoes();
        this.exibirPublicacoesAvancadas(publicacoes);
        let idPublicacao = Number(this._input('Digite o ID da Publicação: '));
        Validacoes_1.Validador.validarNumero(idPublicacao);
        let publicacao = this.buscarPublicacaoAvancada(idPublicacao);
        this.jaInteragiu(this._perfilLogado, publicacao);
        this.exibirTiposInteracao();
        let interacao = this.escolherInteracao();
        this._utils.confirmacao();
        this._redeSocial.adicionarInteracao(interacao, this._perfilLogado, publicacao);
        console.log('Interação adicionada com sucesso!');
    }
    exibirTiposInteracao() {
        console.log('Lista de interações:');
        console.log(`1 - Curtir - ${TipoInteracao_1.TipoInteracao.curtir}`);
        console.log(`2 - Riso - ${TipoInteracao_1.TipoInteracao.riso}`);
        console.log(`3 - Não Curtir - ${TipoInteracao_1.TipoInteracao.nao_curtir}`);
        console.log(`4 - Surpresa - ${TipoInteracao_1.TipoInteracao.surpresa}`);
    }
    escolherInteracao() {
        let numero = 0;
        do {
            try {
                numero = Number(this._input("Digite o número da interação desejada: "));
                switch (numero) {
                    case 1:
                        return TipoInteracao_1.TipoInteracao.curtir;
                        break;
                    case 2:
                        return TipoInteracao_1.TipoInteracao.riso;
                        break;
                    case 3:
                        return TipoInteracao_1.TipoInteracao.nao_curtir;
                        break;
                    case 4:
                        return TipoInteracao_1.TipoInteracao.surpresa;
                        break;
                    default:
                        console.log("Opção inválida!");
                }
            }
            catch (e) {
                if (e instanceof Validacoes_1.AplicacaoError) {
                    console.log(e.message);
                }
                else {
                    console.log("Erro inesperado. Contate o suporte.");
                }
            }
            this._input("Pressione <Enter> para continuar.");
        } while (numero < 1 || numero > 4);
        return TipoInteracao_1.TipoInteracao.curtir;
    }
    jaInteragiu(perfil, publicacao) {
        let interacoes = publicacao.getListaInteracao;
        for (let interacao of interacoes) {
            if (interacao.getPerfilAutor == perfil) {
                throw new Validacoes_1.InteracaoDuplicadaError('O usuário já interagiu nessa publicação!');
            }
        }
    }
    jaCadastrado(email) {
        let perfis = this._redeSocial.getPerfis;
        for (let perfil of perfis) {
            if (perfil.getEmail == email) {
                throw new Validacoes_1.PerfilJaCadastradoError('Já existe um perfil cadastrado com esse email!');
            }
        }
    }
    // Método para salvar perfis, publicações e solicitações em arquivos separados
    salvarDados() {
        // Salvar perfis
        const perfis = this._redeSocial["_perfis"].map(perfil => ({
            tipo: perfil instanceof PerfilAvancado_1.PerfilAvancado ? "PerfilAvancado" : "Perfil",
            id: perfil["_id"],
            apelido: perfil["_apelido"],
            foto: perfil["_foto"],
            email: perfil["_email"],
            status: perfil["_status"],
            amizades: perfil["_amizades"].map(a => a["_id"])
        }));
        fs.writeFileSync("perfis.json", JSON.stringify(perfis, null, 2), 'utf-8');
        // Salvar publicações (incluindo interações para PublicacaoAvancada)
        const publicacoes = this._redeSocial["_publicacoes"].map(pub => ({
            tipo: pub instanceof PublicacaoAvancada_1.PublicacaoAvancada ? "PublicacaoAvancada" : "Publicacao",
            id: pub["_id"],
            conteudo: pub["_conteudo"],
            data: pub["_data"].toISOString(),
            perfilAssociado: pub["_perfilAssociado"]["_id"],
            interacoes: pub instanceof PublicacaoAvancada_1.PublicacaoAvancada
                ? pub["_listaInteracoes"].map(interacao => ({
                    id: interacao["_id"],
                    tipo: interacao["_tipoInteracao"],
                    perfilAutor: interacao["_perfilAutor"]["_id"]
                }))
                : []
        }));
        fs.writeFileSync("publicacoes.json", JSON.stringify(publicacoes, null, 2), 'utf-8');
        // Salvar solicitações de amizade
        const solicitacoes = this._redeSocial["_solicitacoesAmizades"].map(pedido => ({
            perfilSolicitante: pedido["_perfilSolicitante"]["_id"],
            perfilSolicitado: pedido["_perfilSolicitado"]["_id"]
        }));
        fs.writeFileSync("solicitacoes.json", JSON.stringify(solicitacoes, null, 2), 'utf-8');
        console.log("Dados salvos com sucesso!");
    }
    // Método para carregar os dados de arquivos separados
    carregarDados() {
        const perfisMap = new Map();
        // Carregar perfis
        if (fs.existsSync("perfis.json")) {
            const dadosPerfis = JSON.parse(fs.readFileSync("perfis.json", 'utf-8'));
            this._redeSocial["_perfis"] = dadosPerfis.map((p) => {
                const perfil = p.tipo === "PerfilAvancado"
                    ? new PerfilAvancado_1.PerfilAvancado(p.apelido, p.foto, p.email)
                    : new Perfil_1.Perfil(p.apelido, p.foto, p.email);
                Object.assign(perfil, { _id: p.id, _status: p.status });
                perfisMap.set(p.id, perfil);
                return perfil;
            });
            // Restaurar amizades
            dadosPerfis.forEach((p) => {
                const perfil = perfisMap.get(p.id);
                if (perfil) {
                    perfil["_amizades"] = p.amizades.map((id) => perfisMap.get(id));
                }
            });
        }
        // Carregar publicações (incluindo interações)
        if (fs.existsSync("publicacoes.json")) {
            const dadosPublicacoes = JSON.parse(fs.readFileSync("publicacoes.json", 'utf-8'));
            this._redeSocial["_publicacoes"] = dadosPublicacoes.map((p) => {
                const perfil = perfisMap.get(p.perfilAssociado);
                if (!perfil)
                    return null;
                let publicacao;
                if (p.tipo === "PublicacaoAvancada") {
                    publicacao = new PublicacaoAvancada_1.PublicacaoAvancada(p.conteudo, perfil);
                    Object.assign(publicacao, { _id: p.id, _data: new Date(p.data) });
                    // Restaurar interações
                    publicacao["_listaInteracoes"] = p.interacoes.map((i) => {
                        const perfilAutor = perfisMap.get(i.perfilAutor);
                        if (!perfilAutor)
                            return null;
                        const interacao = new Interacao_1.Interacao(i.tipo, perfilAutor);
                        Object.assign(interacao, { _id: i.id });
                        return interacao;
                    }).filter(Boolean);
                }
                else {
                    publicacao = new Publicacao_1.Publicacao(p.conteudo, perfil);
                    Object.assign(publicacao, { _id: p.id, _data: new Date(p.data) });
                }
                return publicacao;
            }).filter(Boolean);
        }
        // Carregar solicitações de amizade
        if (fs.existsSync("solicitacoes.json")) {
            const dadosSolicitacoes = JSON.parse(fs.readFileSync("solicitacoes.json", 'utf-8'));
            this._redeSocial["_solicitacoesAmizades"] = dadosSolicitacoes.map((p) => {
                const perfilSolicitante = perfisMap.get(p.perfilSolicitante);
                const perfilSolicitado = perfisMap.get(p.perfilSolicitado);
                if (perfilSolicitante && perfilSolicitado) {
                    return new PedidoAmizade_1.PedidoAmizade(perfilSolicitante, perfilSolicitado);
                }
                return null;
            }).filter(Boolean);
        }
        console.log("Dados carregados com sucesso!");
    }
}
let app = new App();
app.menuInicial();
