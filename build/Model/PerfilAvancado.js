"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfilAvancado = void 0;
const Perfil_1 = require("./Perfil");
class PerfilAvancado extends Perfil_1.Perfil {
    constructor(apelido, foto, email) {
        super(apelido, foto, email); //herdando atributos da classe base
    }
    //metodos
    habilitarPefil(perfil) {
        perfil.setStatus = true;
    }
    desabilitarPerfil(perfil) {
        perfil.setStatus = false;
    }
}
exports.PerfilAvancado = PerfilAvancado;
