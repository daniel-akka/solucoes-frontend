import UsuarioSimples from "../ClUsuarioSimples";
import Problema from "../ClProblema"

export default class SituacaoDto{
    public usuario: UsuarioSimples
    public resumo: string
    public problema: Problema

    constructor(){
        this.usuario = new UsuarioSimples()
        this.resumo = ''
        this.problema = new Problema()
    }
}