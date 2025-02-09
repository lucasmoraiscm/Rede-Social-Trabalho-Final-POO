import prompt from "prompt-sync";
import { Perfil } from "../Model/Perfil";
import { PerfilInativoError, ConfirmacaoError } from "../Controller/Validacoes";


export class Utils {
    private _input: prompt.Prompt;

    constructor() {
        this._input = prompt();
    }

    public estaAtivo(perfil: Perfil) : void {
        if (perfil.getStatus == false) {
            throw new PerfilInativoError('O perfil está desativado! Acesso negado.')
        }
    }

    public confirmacao() : void {
        let resposta : string = ''
        console.log(`Você confirma essa ação?`);
        console.log('1 - Sim');
        console.log('2 - Não');

        do {
            resposta = this._input('Digite o número da opção desejada: ')

            if (resposta == '2') {
                throw new ConfirmacaoError('Ação não confirmada!');
            }
        } while (resposta != '1');
    }

    public linha() : void {
        console.log('+---------------------------------------+');
    }

}