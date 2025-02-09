import { Interacao } from "./Interacao";
import { Publicacao } from "./Publicacao";
import { Perfil } from './Perfil';

export class PublicacaoAvancada extends Publicacao {
    private _listaInteracoes : Interacao[];

    constructor(conteudo : string , perfil : Perfil){
        super(conteudo,perfil);
        this._listaInteracoes = [];
    }

    // getters e setters
    get getListaInteracao() : Interacao[] {
        return this._listaInteracoes;
    }

    set setListaInteracao(listaInteracao : Interacao[]){
        this._listaInteracoes = listaInteracao;
    }

    //metodos
    public adicionarInteracao(interacao : Interacao) : void {
        this._listaInteracoes.push(interacao);
    }

    public listarInteracao() : Interacao[] {
        return this.getListaInteracao
    }
}