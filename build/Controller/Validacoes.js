"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validador = exports.ConfirmacaoError = exports.AmizadeJaExistenteError = exports.SolicitacaoJaExistenteError = exports.SolicitacaoNaoEncontradaError = exports.PerfilDesativadoError = exports.PerfilAtivadoError = exports.PublicacaoNaoEncontradaError = exports.PerfilJaCadastradoError = exports.InteracaoDuplicadaError = exports.NumeroEmojiIncorretoError = exports.PerfilNaoEncontradoError = exports.PerfilNaoAutorizadoError = exports.PerfilInativoError = exports.StringVaziaError = exports.ValorInvalidoError = exports.AplicacaoError = void 0;
class AplicacaoError extends Error {
}
exports.AplicacaoError = AplicacaoError;
class ValorInvalidoError extends AplicacaoError {
}
exports.ValorInvalidoError = ValorInvalidoError;
class StringVaziaError extends AplicacaoError {
}
exports.StringVaziaError = StringVaziaError;
class PerfilInativoError extends AplicacaoError {
}
exports.PerfilInativoError = PerfilInativoError;
class PerfilNaoAutorizadoError extends AplicacaoError {
}
exports.PerfilNaoAutorizadoError = PerfilNaoAutorizadoError;
class PerfilNaoEncontradoError extends AplicacaoError {
}
exports.PerfilNaoEncontradoError = PerfilNaoEncontradoError;
class NumeroEmojiIncorretoError extends AplicacaoError {
}
exports.NumeroEmojiIncorretoError = NumeroEmojiIncorretoError;
class InteracaoDuplicadaError extends AplicacaoError {
}
exports.InteracaoDuplicadaError = InteracaoDuplicadaError;
class PerfilJaCadastradoError extends AplicacaoError {
}
exports.PerfilJaCadastradoError = PerfilJaCadastradoError;
class PublicacaoNaoEncontradaError extends AplicacaoError {
}
exports.PublicacaoNaoEncontradaError = PublicacaoNaoEncontradaError;
class PerfilAtivadoError extends AplicacaoError {
}
exports.PerfilAtivadoError = PerfilAtivadoError;
class PerfilDesativadoError extends AplicacaoError {
}
exports.PerfilDesativadoError = PerfilDesativadoError;
class SolicitacaoNaoEncontradaError extends AplicacaoError {
}
exports.SolicitacaoNaoEncontradaError = SolicitacaoNaoEncontradaError;
class SolicitacaoJaExistenteError extends AplicacaoError {
}
exports.SolicitacaoJaExistenteError = SolicitacaoJaExistenteError;
class AmizadeJaExistenteError extends AplicacaoError {
}
exports.AmizadeJaExistenteError = AmizadeJaExistenteError;
class ConfirmacaoError extends AplicacaoError {
}
exports.ConfirmacaoError = ConfirmacaoError;
class Validador {
    static validarNumero(valor) {
        if (isNaN(parseFloat(valor)) || !isFinite(valor) || valor < 0) {
            throw new ValorInvalidoError("Valor inválido: " + valor);
        }
    }
    static validarStringVazia(texto) {
        if (texto.trim().length == 0) {
            throw new StringVaziaError("O campo não pode ser vazio.");
        }
    }
}
exports.Validador = Validador;
