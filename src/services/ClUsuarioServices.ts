import UsuarioSimples from "@/classes/ClUsuarioSimples"

import api from "./api"

export default class UsuarioServices{

    private usuario: UsuarioSimples
    private lista_usuarios: Array<UsuarioSimples>

    constructor(){
        this.usuario = new UsuarioSimples()
        this.lista_usuarios = new Array<UsuarioSimples>()
    }

    
    public getByID(id: string): UsuarioSimples{

        this.usuario = new UsuarioSimples()

        this.getByIDAsync(id)

        return this.usuario
    }

    // Default Methods ASYNC:

    private async getByIDAsync(id: string){
    
        if (id == ''){return this.usuario}
    
        let qs = require('qs')
        await api.get('id/', qs.stringfy({
            "id_usuario": id
        })).then((resp) => {

            Object.assign(this.usuario, resp.data)
            return this.usuario
        }).catch(erro => {

            return this.usuario
        })
    }

    public async getByLoginAsync(login_email: string, senha: string): Promise<UsuarioSimples> {

        const qs = require('qs');
        const usuario_retorno = await api.get(qs.stringify({
            'login': login_email, 
            'senha': senha
        })).then(response => {
                this.usuario = response.data
                return this.usuario
            })
            .catch((error) => {
                return new UsuarioSimples()
            })

            return usuario_retorno
    }
}