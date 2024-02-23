import Link from "../ClLink"

export default class SituacaoRecord{
    public id_usuario: string
    public situacao_resumo: string
    public problema_descricao: string
    public problema_links: Array<Link>

    constructor(){
        this.id_usuario = ''
        this.situacao_resumo = ''
        this.problema_descricao = ''
        this.problema_links = new Array<Link>()
    }
}