export default class RecoveryPassword{
    
    public id: string
    public email: string
    public a_confirmar: boolean
    public dias_vencimento: number
    public msg_vencimento: string

    constructor(){
        this.id = ''
        this.email = ''
        this.a_confirmar = false
        this.dias_vencimento = 0
        this.msg_vencimento = ''
    }
}