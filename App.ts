import prompt from "prompt-sync";
import * as fs from 'fs';
import { RedeSocial } from "./Controller/RedeSocial";
import { Perfil } from "./Model/Perfil";
import { PerfilAvancado } from "./Model/PerfilAvancado";
import { InterfaceRedeSocial } from "./View/interface"; 
import { Publicacao } from "./Model/Publicacao";
import { PublicacaoAvancada } from "./Model/PublicacaoAvancada";
import { PedidoAmizade } from "./Model/PedidoAmizade";
import { Interacao } from "./Model/Interacao";
import { TipoInteracao } from "./Model/TipoInteracao";
import { EmojiConverter } from "./Model/emojiConverter";
import { Utils } from "./Utils/utils";
import { AplicacaoError, Validador, PerfilNaoAutorizadoError, PerfilNaoEncontradoError, NumeroEmojiIncorretoError, InteracaoDuplicadaError, PerfilJaCadastradoError, PublicacaoNaoEncontradaError, SolicitacaoNaoEncontradaError, SolicitacaoJaExistenteError, AmizadeJaExistenteError } from "./Controller/Validacoes"; 


class App {
    private _input: prompt.Prompt;
    private _redeSocial: RedeSocial;
    private _interface: InterfaceRedeSocial;
    private _perfilLogado!: Perfil;
    private _utils: Utils;

    constructor() {
        this._input = prompt();
        this._redeSocial = new RedeSocial();
        this._interface = new InterfaceRedeSocial();
        this._utils = new Utils();
        
        try {
            this.carregarDados();
        } catch(e: any) {
            console.log("Erro ao carregar contas.");
        }
    }

    set setPerfilLogado(perfil: Perfil) {
        this._perfilLogado = perfil;
    }

    public menuInicial() : void {
        let opcao: string = '';

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
                        let email : string = this._input('Digite o email cadastrado: ');
                        Validador.validarStringVazia(email);
                        let perfil : Perfil = this._redeSocial.buscarPerfilPorEmail(email);
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

            } catch (e: any) {
                if (e instanceof AplicacaoError) {
                    console.log(e.message);
                } else {
                    console.log("Erro inesperado. Contate o suporte.");
                }
            }
            this._input("Pressione <Enter> para continuar.");

        } while (opcao != "0");
        console.log("Aplicação encerrada.");
    }

    public menuFuncionalidades(): void {
        let opcao: string = '';

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

            } catch (e: any) {
                if (e instanceof AplicacaoError) {
                    console.log(e.message);
                } else {
                    console.log("Erro inesperado. Contate o suporte.");
                }
            }
            this._input("Pressione <Enter> para continuar.");
            
        } while (opcao != "0");
    }

    public cadastrarPerfil() : void {
        let opcaoCadastrarPerfil : string = '';

        do {
            try {
                console.log(this._interface.imprimirCadastrarPerfil());
                opcaoCadastrarPerfil = this._input('Digite o número da opção: ');

                switch (opcaoCadastrarPerfil.toLowerCase()) {
                    case "1":
                        this._utils.linha();
                        console.log('Cadastrar Perfil - Comum');
                        this._utils.linha();
                        let apelido : string = this._input('Digite o apelido: ');
                        Validador.validarStringVazia(apelido);
                        this.exibirEmojis();
                        let numeroEmoji : number = Number(this._input('Digite o número do emoji desejado: '));
                        Validador.validarNumero(numeroEmoji);
                        let foto : string = this.escolherEmoji(numeroEmoji);
                        Validador.validarStringVazia(foto);
                        let email : string = this._input('Digite o email: ');
                        Validador.validarStringVazia(email);
                        this.jaCadastrado(email);
                        this._utils.confirmacao();
                        this._redeSocial.adicionarPerfil(new Perfil(apelido, foto, email));
                        console.log('Perfil cadastrado com sucesso!');
                        break;
                    case "2":
                        this._utils.linha();
                        console.log('Cadastrar Perfil - Avançado');
                        this._utils.linha();
                        let senha : string = this._input('Digite a senha de acesso: ')
                        Validador.validarStringVazia(senha);
                        if (this.permitirAcesso(senha)) {
                            let apelido : string = this._input('Digite o apelido: ');
                            Validador.validarStringVazia(apelido)
                            this.exibirEmojis();
                            let numeroEmoji : number = Number(this._input('Digite o número do emoji desejado: '));
                            Validador.validarNumero(numeroEmoji);
                            let foto : string = this.escolherEmoji(numeroEmoji);
                            Validador.validarStringVazia(foto);
                            let email : string = this._input('Digite o email: ');
                            Validador.validarStringVazia(email);
                            this.jaCadastrado(email);
                            this._utils.confirmacao();
                            this._redeSocial.adicionarPerfil(new PerfilAvancado(apelido, foto, email));
                            console.log('Perfil cadastrado com sucesso!');
                        }
                        else {
                            console.log('Senha incorreta! Acesso negado.')
                        }
                        break;
                    case "0":
                        console.log("Saindo...");
                        break;
                    default:
                        console.log("Opção inválida!");
                }
            } catch (e: any) {
                if (e instanceof AplicacaoError) {
                    console.log(e.message);
                } else {
                    console.log("Erro inesperado. Contate o suporte.");
                }
            }
            this._input("Pressione <Enter> para continuar.");

        } while (opcaoCadastrarPerfil != "0");
    }

    public exibirEmojis() : void {
        let emojis = new EmojiConverter();
        emojis.lerEmoji().forEach((emoji, index) => {
            console.log(`${index + 1}. ${emoji}`);
        });
    }

    public escolherEmoji(numero: number) : string {
        let emojis = new EmojiConverter();
        const listaEmojis = emojis.lerEmoji();

        if (numero < 1 || numero > listaEmojis.length) {
        throw new NumeroEmojiIncorretoError("Número inválido! Escolha um número entre 1 e " + listaEmojis.length);
        }

        return listaEmojis[numero - 1];
    }

    public permitirAcesso(senha: string) : boolean {
        if (senha == '1234') {
            return true;
        }

        return false;
    }

    public buscarPerfil() : void {
        let perfilBuscado : Perfil;
        let opcaoBuscarPerfil: string = '';

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
                        let email : string = this._input('Digite o email: ');
                        Validador.validarStringVazia(email);
                        perfilBuscado = this._redeSocial.buscarPerfilPorEmail(email);
                        console.log('Dados do perfil:')
                        this.exibirDadosPerfil(perfilBuscado);
                        break;
                    case "2":
                        this._utils.estaAtivo(this._perfilLogado);
                        this._utils.linha();
                        console.log('Buscar por Apelido');
                        this._utils.linha();
                        let apelido : string = this._input('Digite o apelido: ');
                        Validador.validarStringVazia(apelido);
                        perfilBuscado = this._redeSocial.buscarPerfilPorApelido(apelido);
                        console.log('Dados do perfil:')
                        this.exibirDadosPerfil(perfilBuscado);
                        break;
                    case "3":
                        this._utils.estaAtivo(this._perfilLogado);
                        this._utils.linha();
                        console.log('Buscar por ID');
                        this._utils.linha();
                        let id : number = Number(this._input('Digite o ID: '));
                        Validador.validarNumero(id);
                        perfilBuscado = this._redeSocial.buscarPerfilPorId(id);
                        console.log('Dados do perfil:')
                        this.exibirDadosPerfil(perfilBuscado);
                        break;
                    case "0":
                        console.log("Saindo...");
                        break;
                    default:
                        console.log("Opção inválida!");
                } 
            
            } catch (e: any) {
                if (e instanceof AplicacaoError) {
                    console.log(e.message);
                } else {
                    console.log("Erro inesperado. Contate o suporte.");
                }
            }
            this._input("Pressione <Enter> para continuar.");

        } while (opcaoBuscarPerfil != "0");
    }

    public exibirDadosPerfil(perfil: Perfil) : void {
        console.log(`\nID: ${perfil.getId}`)
        console.log(`Apelido: ${perfil.getApelido}`);
        console.log(`Foto: ${perfil.getFoto}`);
        console.log(`Email: ${perfil.getEmail}`);
        console.log('Amizades: ');

        if (perfil.getAmizades.length > 0) {
            let amizades : Perfil[] = perfil.getAmizades;

            for (let amizade of amizades){
                console.log(`${amizade.getFoto} - ${amizade.getApelido}`);
            }
        }

        console.log('Publicações:');

        if (perfil.getPublicacoes.length > 0) {
            let publicacoes : Publicacao[] = perfil.getPublicacoes;

            for (let publicacao of publicacoes){
                console.log(`${publicacao.getConteudo} - ${publicacao.getData}`);
            }
        }
    }

    public listarPerfis() : void {
        this._utils.estaAtivo(this._perfilLogado);
        this._utils.linha();
        console.log('Listar Todos os Perfis');
        this._utils.linha();
        let listaPerfis : Perfil[] = this._redeSocial.listarPerfis();

        for (let perfil of listaPerfis) {
            this.exibirDadosPerfil(perfil)
        }
    }

    public ativarDesativarPerfil() : void {
        if (this._perfilLogado instanceof PerfilAvancado) {
            let perfil : Perfil;
            let opcaoAtivarDesativarPerfil : string = '';
            
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

                } catch (e: any) {
                    if (e instanceof AplicacaoError) {
                        console.log(e.message);
                    } else {
                        console.log("Erro inesperado. Contate o suporte.");
                    }
                }
                this._input("Pressione <Enter> para continuar.");

            } while (opcaoAtivarDesativarPerfil != "0");
        } else {
            throw new PerfilNaoAutorizadoError('Perfil não autorizado!');
        }
    }

    public escolherPerfil() : Perfil {
        console.log('Perfis:')
        let perfis : Perfil[] = this._redeSocial.getPerfis;

        if (perfis.length > 1) {
            for (let perfil of perfis) {
                if (perfil != this._perfilLogado){
                    this.exibirDadosPerfil(perfil)
                }
            }
        } else {
            throw new PerfilNaoEncontradoError('Nenhum perfil foi encontrado!');
        }

        let idPerfil : number = Number(this._input('Digite o ID do Perfil: '));
        Validador.validarNumero(idPerfil);
        let perfilEscolhido : Perfil = this._redeSocial.buscarPerfilPorId(idPerfil);
        return perfilEscolhido;
    }

    public adicionarPublicacao() : void {
        let conteudo : string;
        let opcaoAdicionarPublicacao: string = '';

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
                        Validador.validarStringVazia(conteudo);
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
                        Validador.validarStringVazia(conteudo);
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
            } catch (e: any) {
                if (e instanceof AplicacaoError) {
                    console.log(e.message);
                } else {
                    console.log("Erro inesperado. Contate o suporte.");
                }
            }
            this._input("Pressione <Enter> para continuar.");

        } while (opcaoAdicionarPublicacao != "0");
    }

    public listarPublicacoes() : void {
        let listarPublicacoes : Publicacao[];
        let opcaoListarPublicacoes: string = '';

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
                        let perfil : Perfil = this.escolherPerfil();
                        listarPublicacoes = this._redeSocial.listarPublicacoesComFiltro(perfil);
                        this.exibirPublicacoes(listarPublicacoes);
                        break;
                    case "0":
                        console.log("Saindo...");
                        break;
                    default:
                        console.log("Opção inválida!");
                }
            } catch (e: any) {
                if (e instanceof AplicacaoError) {
                    console.log(e.message);
                } else {
                    console.log("Erro inesperado. Contate o suporte.");
                }
            }
            this._input("Pressione <Enter> para continuar.");

        } while (opcaoListarPublicacoes != "0");
    }

    public exibirPublicacoes(publicacoes : Publicacao[]) : void {
        console.log('Publicações:')

        for (let publicacao of publicacoes) {
            console.log(`\nID: ${publicacao.getId}`);
            console.log(`Conteúdo: ${publicacao.getConteudo}`);
            console.log(`Data: ${publicacao.getData}`);
            console.log(`Usuário: ${publicacao.getPerfilAssociado.getApelido}`);

            if (publicacao instanceof PublicacaoAvancada) {
                if (publicacao.getListaInteracao.length > 0) {
                    let interacoes : Interacao[] = publicacao.getListaInteracao;
                    console.log('Interações: ')

                    for (let interacao of interacoes) {
                        console.log(`${interacao.getPerfilAutor.getApelido} - ${interacao.getTipoInteracao}`);
                    }
                }
            } 
        }

    }

    public exibirPublicacoesAvancadas(publicacoes : Publicacao[]) : void {
        console.log('Publicações:')

        for (let publicacao of publicacoes) {
            if (publicacao instanceof PublicacaoAvancada) {
                console.log(`\nID: ${publicacao.getId}`);
                console.log(`Conteúdo: ${publicacao.getConteudo}`);
                console.log(`Data: ${publicacao.getData}`);
                console.log(`Usuário: ${publicacao.getPerfilAssociado.getApelido}`);

                if (publicacao.getListaInteracao.length > 0) {
                    let interacoes : Interacao[] = publicacao.getListaInteracao;
                    console.log('Interações: ')

                    for (let interacao of interacoes) {
                        console.log(`${interacao.getPerfilAutor.getApelido} - ${interacao.getTipoInteracao}`);
                    }
                }
            }
        }
    }

    public buscarPublicacaoAvancada(id: number): PublicacaoAvancada {
        let publicacoes = this._redeSocial.getPublicacoes;
        let publicacaoBuscada! : PublicacaoAvancada;

        for (let publicacao of publicacoes) {
            if (publicacao instanceof PublicacaoAvancada && publicacao.getId == id){
                publicacaoBuscada = publicacao;
                return publicacaoBuscada
            }
        }

        if (publicacaoBuscada) {
            return publicacaoBuscada;
        } else {
            throw new PublicacaoNaoEncontradaError('Publicação não encontrada!')
        }
    }

    public enviarSolicitacaoAmizade() : void {
        this._utils.estaAtivo(this._perfilLogado);
        this._utils.linha();
        console.log('Enviar Solicitação de Amizade');
        this._utils.linha();
        let perfil : Perfil = this.escolherPerfil();
        this.existeAmizade(perfil);
        this.existeSolicitacaoEspecifica(perfil);
        this._utils.confirmacao();
        this._redeSocial.enviarSolicitacaoAmizade(this._perfilLogado, perfil);
        console.log('Solicitação enviada com sucesso!');
    }

    public aceitarSolicitacao() : void {
        this._utils.estaAtivo(this._perfilLogado);
        this._utils.linha();
        console.log('Aceitar Solicitação de Amizade');
        this._utils.linha();
        this.existeSolicitacoesPendentes(this._perfilLogado);
        let solicitacaoEscolhida : PedidoAmizade = this.escolherSolicitacao();
        this._utils.confirmacao();
        this._redeSocial.aceitarSolicitacao(solicitacaoEscolhida.getPerfilSolicitante, this._perfilLogado);
        console.log('Solicitação aceita com sucesso!');
    }

    public recusarSolicitacao() : void {
        this._utils.estaAtivo(this._perfilLogado);
        this._utils.linha();
        console.log('Recusar Solicitação de Amizade');
        this._utils.linha();
        this.existeSolicitacoesPendentes(this._perfilLogado);
        let solicitacaoEscolhida : PedidoAmizade = this.escolherSolicitacao();
        this._utils.confirmacao();
        this._redeSocial.recusarSolicitacao(solicitacaoEscolhida.getPerfilSolicitante, this._perfilLogado);
        console.log('Solicitação recusada com sucesso!');
    }

    public listarSolicitacoes(solicitacoes: PedidoAmizade[]) : void {
        let cont : number = 1;
        console.log('Solicitações pendentes:');

        for (let solicitacao of solicitacoes) {
            console.log(`${cont}. ${solicitacao.getPerfilSolicitante.getFoto} - ${solicitacao.getPerfilSolicitante.getApelido} `);
            cont++;
        }
    }

    public escolherSolicitacao() : PedidoAmizade {
        let solicitacoes : PedidoAmizade[] = this._redeSocial.solicitacoesParaPerfil(this._perfilLogado);
        this.listarSolicitacoes(solicitacoes);
        let numeroPerfil : number = Number(this._input('Digite o número da solicitação que deseja escolher: '));
        Validador.validarNumero(numeroPerfil);
        let solicitacaoEscolhida = solicitacoes[numeroPerfil - 1];

        if (solicitacaoEscolhida) {
            return solicitacaoEscolhida;
        } else {
            throw new SolicitacaoNaoEncontradaError('A solicitação não foi encontrada!')
        }
    }

    public existeAmizade(perfil : Perfil) : void {
        let amizades : Perfil[] = this._perfilLogado.getAmizades;

        for (let amizade of amizades) {
            if (amizade == perfil) {
                throw new AmizadeJaExistenteError('O usuário já é amigo desse perfil!');
            }
        }
    }

    public existeSolicitacaoEspecifica(perfil : Perfil) : void {
        let solicitacoes : PedidoAmizade[] = this._redeSocial.getSolicitacoes;

        for (let solicitacao of solicitacoes) {
            if (solicitacao.getPerfilSolicitante == this._perfilLogado && solicitacao.getPerfilSolicitado == perfil) {
                throw new SolicitacaoJaExistenteError('O usuário já enviou uma solicitação para esse perfil!');
            } else if (solicitacao.getPerfilSolicitante == perfil && solicitacao.getPerfilSolicitado == this._perfilLogado) {
                throw new SolicitacaoJaExistenteError('O perfil já enviou uma solicitação para você!');
            }
        }
    }

    public existeSolicitacoesPendentes(perfil: Perfil) : boolean {
        let solicitacoes : PedidoAmizade[] = this._redeSocial.getSolicitacoes;

        for (let solicitacao of solicitacoes) {
            if (solicitacao.getPerfilSolicitado == perfil) {
                return true;
            }
        }

        throw new SolicitacaoNaoEncontradaError('Nenhuma solicitação foi encontrada!');
    }

    public adicionarInteracao() : void {
        this._utils.estaAtivo(this._perfilLogado);
        this._utils.linha();
        console.log('Adicionar Interação');
        this._utils.linha();
        let publicacoes : Publicacao[] = this._redeSocial.listarPublicacoes();
        this.exibirPublicacoesAvancadas(publicacoes);
        let idPublicacao : number = Number(this._input('Digite o ID da Publicação: '));
        Validador.validarNumero(idPublicacao);
        let publicacao : PublicacaoAvancada = this.buscarPublicacaoAvancada(idPublicacao);

        this.jaInteragiu(this._perfilLogado, publicacao)
        this.exibirTiposInteracao();
        let interacao : TipoInteracao = this.escolherInteracao();
        this._utils.confirmacao();
        this._redeSocial.adicionarInteracao(interacao, this._perfilLogado, publicacao);
        console.log('Interação adicionada com sucesso!');
    }

    public exibirTiposInteracao() : void {
        console.log('Lista de interações:');
        console.log(`1 - Curtir - ${TipoInteracao.curtir}`);
        console.log(`2 - Riso - ${TipoInteracao.riso}`);
        console.log(`3 - Não Curtir - ${TipoInteracao.nao_curtir}`);
        console.log(`4 - Surpresa - ${TipoInteracao.surpresa}`);
    }

    public escolherInteracao() : TipoInteracao {
        let numero : number = 0;

        do {
            try{
                numero = Number(this._input("Digite o número da interação desejada: "));

                switch (numero) {
                case 1:
                    return TipoInteracao.curtir;
                    break;
                case 2:
                    return TipoInteracao.riso
                    break;
                case 3:
                    return TipoInteracao.nao_curtir;
                    break;
                case 4:
                    return TipoInteracao.surpresa;
                    break;
                default:
                    console.log("Opção inválida!");
                }
            } catch (e: any) {
                if (e instanceof AplicacaoError) {
                    console.log(e.message);
                } else {
                    console.log("Erro inesperado. Contate o suporte.");
                }
            }
            this._input("Pressione <Enter> para continuar.");
        } while (numero < 1 || numero > 4);

        return TipoInteracao.curtir;
    }

    public jaInteragiu(perfil: Perfil, publicacao: PublicacaoAvancada) : void {
        let interacoes = publicacao.getListaInteracao;

        for (let interacao of interacoes) {
            if (interacao.getPerfilAutor == perfil) {
                throw new InteracaoDuplicadaError('O usuário já interagiu nessa publicação!');
            }
        }
    }

    public jaCadastrado(email : string) : void {
        let perfis : Perfil[] = this._redeSocial.getPerfis;

        for (let perfil of perfis) {
            if (perfil.getEmail == email) {
                throw new PerfilJaCadastradoError('Já existe um perfil cadastrado com esse email!');
            }
        }
    }

    // Método para salvar perfis, publicações e solicitações em arquivos separados
    salvarDados(): void {
        // Salvar perfis
        const perfis = this._redeSocial["_perfis"].map(perfil => ({
            tipo: perfil instanceof PerfilAvancado ? "PerfilAvancado" : "Perfil",
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
            tipo: pub instanceof PublicacaoAvancada ? "PublicacaoAvancada" : "Publicacao",
            id: pub["_id"],
            conteudo: pub["_conteudo"],
            data: pub["_data"].toISOString(),
            perfilAssociado: pub["_perfilAssociado"]["_id"],
            interacoes: pub instanceof PublicacaoAvancada
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
    carregarDados(): void {
        const perfisMap = new Map<number, Perfil>();

        // Carregar perfis
        if (fs.existsSync("perfis.json")) {
            const dadosPerfis = JSON.parse(fs.readFileSync("perfis.json", 'utf-8'));

            this._redeSocial["_perfis"] = dadosPerfis.map((p: any) => {
                const perfil = p.tipo === "PerfilAvancado"
                    ? new PerfilAvancado(p.apelido, p.foto, p.email)
                    : new Perfil(p.apelido, p.foto, p.email);

                Object.assign(perfil, { _id: p.id, _status: p.status });
                perfisMap.set(p.id, perfil);
                return perfil;
            });

            // Restaurar amizades
            dadosPerfis.forEach((p: any) => {
                const perfil = perfisMap.get(p.id);
                if (perfil) {
                    perfil["_amizades"] = p.amizades.map((id: number) => perfisMap.get(id));
                }
            });
        }

        // Carregar publicações (incluindo interações)
        if (fs.existsSync("publicacoes.json")) {
            const dadosPublicacoes = JSON.parse(fs.readFileSync("publicacoes.json", 'utf-8'));

            this._redeSocial["_publicacoes"] = dadosPublicacoes.map((p: any) => {
                const perfil = perfisMap.get(p.perfilAssociado);
                if (!perfil) return null;

                let publicacao;
                if (p.tipo === "PublicacaoAvancada") {
                    publicacao = new PublicacaoAvancada(p.conteudo, perfil);
                    Object.assign(publicacao, { _id: p.id, _data: new Date(p.data) });

                    // Restaurar interações
                    publicacao["_listaInteracoes"] = p.interacoes.map((i: any) => {
                        const perfilAutor = perfisMap.get(i.perfilAutor);
                        if (!perfilAutor) return null;
                        const interacao = new Interacao(i.tipo, perfilAutor);
                        Object.assign(interacao, { _id: i.id });
                        return interacao;
                    }).filter(Boolean);
                } else {
                    publicacao = new Publicacao(p.conteudo, perfil);
                    Object.assign(publicacao, { _id: p.id, _data: new Date(p.data) });
                }

                return publicacao;
            }).filter(Boolean);
        }

        // Carregar solicitações de amizade
        if (fs.existsSync("solicitacoes.json")) {
            const dadosSolicitacoes = JSON.parse(fs.readFileSync("solicitacoes.json", 'utf-8'));

            this._redeSocial["_solicitacoesAmizades"] = dadosSolicitacoes.map((p: any) => {
                const perfilSolicitante = perfisMap.get(p.perfilSolicitante);
                const perfilSolicitado = perfisMap.get(p.perfilSolicitado);
                if (perfilSolicitante && perfilSolicitado) {
                    return new PedidoAmizade(perfilSolicitante, perfilSolicitado);
                }
                return null;
            }).filter(Boolean);
        }

        console.log("Dados carregados com sucesso!");
    }
}

let app : App = new App();
app.menuInicial();