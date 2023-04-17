import ClienteBD from '../Persistencia/ClienteDB.js';
export default class Cliente{
    #cpf;
    #nome;
    #endereco;
    #bairro;
    #cidade;
    #uf;
    #telefone;
    #email;

    constructor(cpf, nome, endereco, bairro, cidade, uf, telefone, email){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#telefone = telefone;
        this.#email = email;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        if(novoNome != "")
            this.#nome = novoNome;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        this.#endereco = novoEndereco;
    }

    get bairro(){
        return this.#bairro;
    }

    set bairro(novoBairro){
        this.#bairro = novoBairro;
    }
    
    get cidade(){
        return this.#cidade;
    }

    set cidade(novoCidade){
        this.#cidade = novoCidade;
    }

    get uf(){
        return this.#uf;
    }

    set uf(novoUf){
        this.#uf = novoUf;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTelefone){
        this.#telefone = novoTelefone;
    }

    get email(){
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }

    toJSON(){
        return{
            "cpf"       : this.#cpf,
            "nome"      : this.#nome,
            "endereco"  : this.#endereco,
            "bairro"    : this.#bairro,
            "cidade"    : this.#cidade,
            "uf"        : this.#uf,
            "telefone"  : this.#telefone,
            "email"     : this.#email,
        }
    }

    async gravar(){
        const clienteBD = new ClienteBD();
        await clienteBD.incluir(this);
    }

    async atualizar(){
        const clienteBD = new ClienteBD();
        await clienteBD.alterar(this);
    }

    async removerDoBancoDados(){
        const clienteBD = new ClienteBD();
        await clienteBD.excluir(this);
    }

    async consultar(termo){
        const clienteBD = new ClienteBD();
        const clientes = await clienteBD.consultar(termo);
        return clientes;
    }

    async consultarCPF(cpf){
        const clienteBD = new ClienteBD();
        const clientes = await clienteBD.consultarCPF(termo);
        return clientes;
    }
}   
