import Link from './ClLink'
import Situacao from './ClSituacao'

export default class Problema{
    public id: string
    public descricao: string
    public links: Array<Link>
    public situacao: Situacao
    /* Falta Incluir Imagens, DOCs e Videos */

    constructor(){
        this.id = ''
        this.descricao = ''
        this.links = new Array<Link>()
        this.situacao = new Situacao()
    }
}