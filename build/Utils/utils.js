"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const Validacoes_1 = require("../Controller/Validacoes");
class Utils {
    constructor() {
        this._input = (0, prompt_sync_1.default)();
    }
    estaAtivo(perfil) {
        if (perfil.getStatus == false) {
            throw new Validacoes_1.PerfilInativoError('O perfil está desativado! Acesso negado.');
        }
    }
    confirmacao() {
        let resposta = '';
        console.log(`Você confirma essa ação?`);
        console.log('1 - Sim');
        console.log('2 - Não');
        do {
            resposta = this._input('Digite o número da opção desejada: ');
            if (resposta == '2') {
                throw new Validacoes_1.ConfirmacaoError('Ação não confirmada!');
            }
        } while (resposta != '1');
    }
    linha() {
        console.log('+---------------------------------------+');
    }
}
exports.Utils = Utils;
