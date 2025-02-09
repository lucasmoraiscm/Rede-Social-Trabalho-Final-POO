import { Perfil } from '../Model/Perfil'
import { PerfilAvancado } from '../Model/PerfilAvancado'
import { Publicacao } from '../Model/Publicacao'
import { PublicacaoAvancada } from '../Model/PublicacaoAvancada'
import { PedidoAmizade } from '../Model/PedidoAmizade'
import { Interacao } from '../Model/Interacao'
import { TipoInteracao } from '../Model/TipoInteracao'
import { PerfilNaoEncontradoError , PublicacaoNaoEncontradaError, PerfilAtivadoError, PerfilDesativadoError } from '../Controller/Validacoes'


export class RedeSocial {
    private _perfis : Perfil[];
    private _publicacoes : Publicacao[];
    private _solicitacoesAmizades : PedidoAmizade[];

    constructor(){
        this._perfis = []
        this._publicacoes = [];
        this._solicitacoesAmizades = [];
    }


    //getters e setters
    get getPerfis() : Perfil[]{
        return this._perfis;
    }
    
    set setPerfis(perfis : Perfil[]) {
        this._perfis = perfis;
    }
    
    get getPublicacoes() : Publicacao[]{
        return this._publicacoes;
    }

    set setPublicacoes(publicacoes : Publicacao[]){
        this._publicacoes = publicacoes;
    }

    get getSolicitacoes() : PedidoAmizade[] {
        return this._solicitacoesAmizades;
    }

    set setSolicitacoes(solicitacoes : PedidoAmizade[]){
        this._solicitacoesAmizades = solicitacoes;
    }

    //metodos
    //gerenciamento de perfil
    public adicionarPerfil(perfil : Perfil) : void {
        this._perfis.push(perfil);
    }

    public buscarPerfilPorEmail(email : string) : Perfil {
        let perfis : Perfil[] = this.getPerfis;
        perfis = perfis.filter(perfil => perfil.getEmail == email);

        if (perfis[0]) {
            return perfis[0];
        } else {
            throw new PerfilNaoEncontradoError('Perfil não encontrado!');
        }  
    }

    public buscarPerfilPorApelido(apelido : string) : Perfil {
        let perfis : Perfil[] = this.getPerfis;
        perfis = perfis.filter(perfil => perfil.getApelido == apelido);

        if (perfis[0]) {
           return perfis[0]; 
        } else {
            throw new PerfilNaoEncontradoError('Perfil não encontrado!');
        } 
    }

    public buscarPerfilPorId(id : number) : Perfil {
        let perfis : Perfil[] = this.getPerfis;
        perfis = perfis.filter(perfil => perfil.getId == id);

        if (perfis[0]) {
            return perfis[0];
        } else {
            throw new PerfilNaoEncontradoError('Perfil não encontrado!');
        } 
    }

    public listarPerfis() : Perfil[] {
        return this.getPerfis;
    }

    public ativarPerfil(perfilAvancado: PerfilAvancado, perfil: Perfil) : void {
        if (perfil.getStatus == false) {
            perfilAvancado.habilitarPefil(perfil);
        } else {
            throw new PerfilAtivadoError('O perfil já está ativado!');
        }
    }

    public desativarPerfil(perfilAvancado: PerfilAvancado, perfil: Perfil) : void {
        if (perfil.getStatus == true) {
            perfilAvancado.desabilitarPerfil(perfil);
        } else {
            throw new PerfilDesativadoError('O perfil já está desativado!');
        }
    }

    //gerenciamento de publicacoes
    public adicionarPublicacaoSimples(conteudo: string, perfil : Perfil) : void {
        let publicacao = new Publicacao(conteudo, perfil);
        perfil.adicionarPublicacao(publicacao);
        this._publicacoes.push(publicacao);
    }

    public adicionarPublicacaoAvancada(conteudo: string, perfil : Perfil) : void {
        let publicacao = new PublicacaoAvancada(conteudo, perfil);
        perfil.adicionarPublicacao(publicacao);
        this._publicacoes.push(publicacao);
    }

    public listarPublicacoes() : Publicacao[] {
        let publicacoes = this.getPublicacoes;
        publicacoes.sort((a, b) => b.getData.getTime() - a.getData.getTime());

        if (publicacoes.length > 0) {
            return publicacoes;
        } else {
            throw new PublicacaoNaoEncontradaError('Nenhuma publicação encontrada!');
        }
    }

    public listarPublicacoesComFiltro(perfil : Perfil) : Publicacao[] {
        let publicacoes : Publicacao[] = this.getPublicacoes;
        let publicacoesFiltradas: Publicacao[] = []

        for (let publicacao of publicacoes) {
            if (publicacao.getPerfilAssociado == perfil) {
                    publicacoesFiltradas.push(publicacao);
            }
        }

        publicacoesFiltradas.sort((a, b) => b.getData.getTime() - a.getData.getTime());

        if (publicacoesFiltradas.length > 0) {
            return publicacoesFiltradas;
        } else {
            throw new PublicacaoNaoEncontradaError('Nenhuma publicação foi encontrada!');
        }
    }

    //gerenciamento de solicitaçoes
    public enviarSolicitacaoAmizade(perfilSolicitante: Perfil, perfilSolicitado: Perfil): void {
        this._solicitacoesAmizades.push(new PedidoAmizade(perfilSolicitante, perfilSolicitado));
    }

    public aceitarSolicitacao(perfilSolicitante : Perfil, perfilSolicitado : Perfil): void {
        let solicitacoes : PedidoAmizade[] = this.getSolicitacoes

        solicitacoes = solicitacoes.filter(
            solicitacao => solicitacao.getPerfilSolicitante != perfilSolicitante &&
            solicitacao.getPerfilSolicitado != perfilSolicitado
        )
        
        perfilSolicitante.adicionarAmigo(perfilSolicitado);
        perfilSolicitado.adicionarAmigo(perfilSolicitante);
        this._solicitacoesAmizades = solicitacoes;
    }

    public recusarSolicitacao(perfilSolicitante : Perfil, perfilSolicitado : Perfil) {
        let solicitacoes : PedidoAmizade[] = this.getSolicitacoes

        solicitacoes = solicitacoes.filter(
            solicitacao => solicitacao.getPerfilSolicitante != perfilSolicitante &&
            solicitacao.getPerfilSolicitado != perfilSolicitado
        )

        this._solicitacoesAmizades = solicitacoes;
    }

    public solicitacoesParaPerfil(perfilSolicitado : Perfil) : PedidoAmizade[] {
        let solicitacoes : PedidoAmizade[] = this.getSolicitacoes
        solicitacoes = solicitacoes.filter(solicitacao => solicitacao.getPerfilSolicitado == perfilSolicitado);
        return solicitacoes;
    }

    //gerenciamento de interaçoes
    public adicionarInteracao(tipo: TipoInteracao, perfil : Perfil, publicacao : PublicacaoAvancada) : void {
        publicacao.adicionarInteracao(new Interacao(tipo, perfil));
    }
}