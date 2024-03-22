import api from '@/services/api'

export default class ServiceRecoverPassword {

    public async getByID(id: string) {

        const response = await api.get('RecoveryPassword', JSON.parse(id))
        
     return response   
    }
}