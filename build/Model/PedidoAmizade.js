"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoAmizade = void 0;
class PedidoAmizade {
    constructor(perfilSolicitante, perfilSolicitado) {
        this._perfilSolicitante = perfilSolicitante;
        this._perfilSolicitado = perfilSolicitado;
    }
    //getters e setters
    set setPerfilSolicitante(perfilSolicitante) {
        this._perfilSolicitante = perfilSolicitante;
    }
    set setPerfilSolicitado(perfilSolicitado) {
        this._perfilSolicitado = perfilSolicitado;
    }
    get getPerfilSolicitante() {
        return this._perfilSolicitante;
    }
    get getPerfilSolicitado() {
        return this._perfilSolicitado;
    }
}
exports.PedidoAmizade = PedidoAmizade;
