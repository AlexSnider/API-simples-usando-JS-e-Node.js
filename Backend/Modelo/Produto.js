import ProdutoBD from '../Persistencia/ProdutoDB.js';
export default class Produto{
    #codigo;
    #descricao;
    #qtdEstoque;
    #paisOrigem;
    #peso;
    #cor;

    constructor(codigo, desricao, qtdEstoque, paisOrigem, peso, cor){
        this.#codigo = codigo;
        this.#descricao = desricao;
        this.#qtdEstoque = qtdEstoque;
        this.#paisOrigem = paisOrigem;
        this.#peso = peso;
        this.#cor = cor;
    }

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novoDescri){
        this.#descricao = novoDescri;
    }

    get qtdEstoque(){
        return this.#qtdEstoque;
    }

    set qtdEstoque(novaQtd){
        this.#qtdEstoque = novaQtd;
    }

    get paisOrigem(){
        return this.#paisOrigem;
    }

    set paisOrigem(novaOrigem){
        this.#paisOrigem = novaOrigem;
    }

    get peso(){
        return this.#peso;
    }

    set peso(novoPeso){
        this.#peso = novoPeso;
    }

    get cor(){
        return this.#cor;
    }

    set cor(novaCor){
        this.#cor = novaCor;
    }

    toJSON(){
        return{
            "codigo"     : this.#codigo,
            "descricao"  : this.#descricao,
            "qtdEstoque" : this.#qtdEstoque,
            "paisOrigem" : this.#paisOrigem,
            "peso"       : this.#peso,
            "cor"        : this.#cor,
        }
    }

    async gravar(){
        const produtoBD = new ProdutoBD();
        await produtoBD.incluir(this);
    }

    async atualizar(){
        const produtoBD = new ProdutoBD();
        await produtoBD.alterar(this);
    }

    async exluirDoBancoDados(){
        const produtoBD = new ProdutoBD();
        await produtoBD.excluir(this);
    }

    async consultar(termo){
        const produtoBD = new ProdutoBD();
        const produtos = await produtoBD.consultar(termo);
        return produtos;
    }

    async consultarCodigo(codigo){
        const produtoBD = new ProdutoBD();
        const produtos = await produtoBD.consultarCodigo(codigo);
        return produtos;
    }
}
