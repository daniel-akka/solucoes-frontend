export default class UsuarioConsulta {
    private login: String
    private email: String

    public constructor(){
        this.login = ''
        this.email = ''
    }

    public novoLogin(newLogin: String): UsuarioConsulta{
        this.login = newLogin
        return this
    }

    public novoEmail(newEmail: String): UsuarioConsulta{
        this.email = newEmail
        return this
    }

    public getLogin(): String{return this.login}
    public getEmail(): String{return this.email}
}