import SituacaoDto from "@/classes/dto/ClSituacaoDto";
import api from "./api";

export default class SituacaoServices {

    public async get(id: string | undefined): Promise<SituacaoDto | undefined>{

        let dto = new SituacaoDto()
    
        if (id == ''){return undefined}
    
        let qs = require('qs')
        let data = await api.get('Situacao/', qs.stringfy({
            "id_situacao": id
        })).then((resp) => {
            Object.assign(dto, resp.data)
        }).catch(erro => {
            return undefined
        })
    }
}