import Link from "../ClLink"
import Situacao from "../ClSituacao"

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

    public setSituacao(situcaoR: Situacao){
        this.id_usuario = situcaoR.id_usuario
        this.situacao_resumo = situcaoR.resumo
        this.problema_descricao = situcaoR.problema_descricao
        situcaoR.problema_links.forEach(l => {
            this.problema_links.push(l)
        }) 
    }
}