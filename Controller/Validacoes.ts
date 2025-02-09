export class AplicacaoError extends Error {
}

export class ValorInvalidoError extends AplicacaoError {
}

export class StringVaziaError extends AplicacaoError {
}

export class PerfilInativoError extends AplicacaoError {
}

export class PerfilNaoAutorizadoError extends AplicacaoError {
}

export class PerfilNaoEncontradoError extends AplicacaoError {
}

export class NumeroEmojiIncorretoError extends AplicacaoError {
}

export class InteracaoDuplicadaError extends AplicacaoError {
}

export class PerfilJaCadastradoError extends AplicacaoError {
}

export class PublicacaoNaoEncontradaError extends AplicacaoError {
}

export class PerfilAtivadoError extends AplicacaoError {
}

export class PerfilDesativadoError extends AplicacaoError {
}

export class SolicitacaoNaoEncontradaError extends AplicacaoError {
}

export class SolicitacaoJaExistenteError extends AplicacaoError {
}

export class AmizadeJaExistenteError extends AplicacaoError {
}

export class ConfirmacaoError extends AplicacaoError {
}

export class Validador {

    static validarNumero(valor: any): void {
        if (isNaN(parseFloat(valor)) || !isFinite(valor) || valor < 0) {
            throw new ValorInvalidoError("Valor inválido: " + valor);
        }

    }

    static validarStringVazia(texto: string): void {
        if (texto.trim().length == 0) {
            throw new StringVaziaError("O campo não pode ser vazio.");
        }
    }
}