import { Publicacao } from "./Publicacao"

export class Perfil {
    private static _idContador = 0 //static pertence a classe e nao a uma instância especifica
    private _id : number;
    private _apelido : string;
    private _foto : string;
    private _email : string;
    private _status : boolean;
    private _amizades : Perfil[];
    private _postagens : Publicacao[];

    constructor(apelido : string , foto : string , email : string){
        this._id = ++Perfil._idContador; //// Incrementa e atribui o ID
        this._apelido = apelido;
        this._foto = foto;
        this._email = email;
        this._status = true;
        this._amizades = [];
        this._postagens = [];
    }

    //getters e setters
    get getId(): number {
        return this._id;
    }

    set setId(id : number) {
        this._id = id;
    }

    get getApelido() : string  {
        return this._apelido;
    }

    set setApelido(apelido : string) {
        this._apelido = apelido;
    }

    get getFoto() : string {
        return this._foto;
    }

    set setFoto(foto : string) {
        this._foto = foto;
    }

    get getEmail() : string {
        return this._email;
    }

    set setEmail(email : string) {
        this._email = email;
    }

    get getStatus() : boolean {
        return this._status;
    }

    set setStatus(status : boolean) {
        this._status = status;
    }

    get getAmizades() : Perfil[] {
        return this._amizades;
    }

    get getPublicacoes() : Publicacao[] {
        return this._postagens;
    }

    //metodos
    public adicionarAmigo(amigo : Perfil) : void {
        this._amizades.push(amigo);
    }

    public removerAmigo(amigo : Perfil) : void {
        this._amizades = this._amizades.filter((a) => a.getId !== amigo.getId);
    }

    public adicionarPublicacao(publicacao : Publicacao) : void {
        this._postagens.push(publicacao);
    }

    public listarAmigos() : Perfil[] {
        return [...this._amizades]; ///retorna copia do array para evitar modificaçoes//proteger array interna da classe
    }

    public listarPostagens() : Publicacao[] {
        return [...this._postagens];
    }

    public ativarPerfil() {
        this._status = true;
    }

    public desativarPerfil() {
        this._status = false;
    }
}

