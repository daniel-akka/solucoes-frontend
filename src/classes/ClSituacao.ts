import Link from "./ClLink"

export default class Situacao{
    public id: string
    public id_usuario: string
    public resumo: string
    public problema_id: string
    public problema_descricao: string
    public problema_links: Array<Link>

    constructor(){
        this.id = ''
        this.id_usuario = ''
        this.resumo = ''
        this.problema_descricao = ''
        this.problema_id = ''
        this.problema_links = new Array<Link>()
    }
}