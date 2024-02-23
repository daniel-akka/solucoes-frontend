export default class UsuarioSimples {
    public id: string
    public login: string
    public email: string
    public senha: string

    public constructor(){
        this.login = ''
        this.email = ''
        this.senha = ''
        this.id = ''
    }
}