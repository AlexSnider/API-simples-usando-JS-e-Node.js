import Produto from '../Modelo/Produto.js';
import conectar from './Conexao.js';

export default class ProdutoDB {
    async incluir(produto) {
        
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = "INSERT INTO produto (codigo, descricao, qtdEstoque, paisOrigem, peso, cor) \
                                              VALUES(?, ?, ?, ?, ?, ?)";
            const valores = [produto.codigo, produto.descricao, produto.qtdEstoque,
                             produto.paisOrigem, produto.peso, produto.cor];
            await conexao.query(sql, valores);
        }
    }

    async alterar(produto) {
        
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = "UPDATE produto SET descricao = ?, qtdEstoque = ?, paisOrigem = ?, \
                                            peso = ?, cor = ? \
                         WHERE codigo = ?";
            const valores = [produto.descricao, produto.qtdEstoque, produto.paisOrigem, produto.peso, 
                             produto.cor, produto.codigo];
            await conexao.query(sql, valores);
        }
    }

    async excluir(produto) {
        
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = "DELETE FROM produto WHERE codigo = ?";
            const valores = [produto.codigo];
            await conexao.query(sql, valores);
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        const sql = "SELECT * FROM produto WHERE codigo LIKE ?";
        const valores = ['%' + termo + '%' ]
        const [rows] = await conexao.query(sql, valores);
        const listaProdutos = [];
        for(const row of rows){
            const produto = new Produto(row['codigo'], row['descricao'], row['qtdEstoque'],
                                        row['paisOrigem,'], row['peso'], row['cor'])
            listaProdutos.push(produto);
        }
        return listaProdutos;
    }

    async consultarCodigo(codigo) {
        const conexao = await conectar();
        const sql = "SELECT * FROM produto WHERE codigo =  ?";
        const valores = [codigo]
        const [rows] = await conexao.query(sql, valores);
        const listaProdutos = [];
        for(const row of rows){
            const produto = new Produto(row['codigo'], row['descricao'], row['qtdEstoque'],
                                        row['paisOrigem,'], row['peso'], row['cor'])
            listaProdutos.push(produto);
        }
        return listaProdutos;
    }
}
