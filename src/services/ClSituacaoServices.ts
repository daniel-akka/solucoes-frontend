import Situacao from '@/classes/ClSituacao'
import SituacaoRecord from '@/classes/dto/ClSituacaoRecord';
import api from "@/services/api";

export default class SituacaoServices {

    private situacao: Situacao

    constructor(){
        this.situacao = new Situacao()
    }

    public async get(id: string): Promise<Situacao>{

        if (id == ''){return this.situacao}
        const qs = require('qs')
        const situacao_retorno = await api.get('Situacao/', {params:{
            id_situacao: id
        }}).then((resp) => {
            
            Object.assign(this.situacao, resp.data)
            return resp.data
        }).catch(erro => {
            return this.situacao
        })

        return situacao_retorno
    }

    public async save(situacaoR: SituacaoRecord): Promise<Situacao>{

        this.situacao = new Situacao()
        
        const qs = require('qs')
        const situacao_retorno = await api.post('Situacao', JSON.parse(JSON.stringify(situacaoR)))
            .then((resp) => {
            return resp
        }).catch(erro => {

            return erro
        })

        return situacao_retorno
    }

    public async update(id: string, situacaoR: SituacaoRecord): Promise<Situacao>{

        if (id == ''){return this.situacao}
        const qs = require('qs')
        
        const situacao_retorno = await api.put('Situacao', JSON.parse(JSON.stringify(situacaoR)), {params:{
            id_situacao: id
        }}).then((resp) => {
            
            Object.assign(this.situacao, resp.data)
            return resp.data
        }).catch(erro => {
            return this.situacao
        })

        return situacao_retorno
    }

    public async delete(id: string){
        
        const situacao_retorno = await api.delete('Situacao', {params:{
            id_situacao: id
        }}).catch(erro => {
            console.log('Erro: ' + erro)
        })

        return situacao_retorno
    }
}