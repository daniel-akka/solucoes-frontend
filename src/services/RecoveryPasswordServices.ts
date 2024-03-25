import RecoveryPassword from '@/classes/ClRecoveryPassword'
import api from '@/services/api'

export default class RecoveryPasswordServices {

    public async getByID(id: string): Promise<RecoveryPassword> {

        let recovery_password = new RecoveryPassword()
        

        if (id != ''){

            const resp = await api.get('RecoveryPassword/' + id).then((retorno) => {

                Object.assign(recovery_password, retorno.data)
            })
            .catch((erro) => {
                console.log(erro)
            })
        }
            
        
        
     return recovery_password   
    }


    public async enviarEmail(email: string){

        const response = await api.post('RecoveryPassword/', email)

        return response
    }

    public async updateSenhaRecovery(id_recovery: string, email: string, senha: string){

        let data = require('qs')
        data = {
            'id_recovery': id_recovery,
            'email': email,
            'senha': senha
        }
        const response = await api.put('RecoveryPassword/Update', data)

        return response
    }
}