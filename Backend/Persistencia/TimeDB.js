import Time from '../Modelo/Time.js';
import conectar from './Conexao.js';

export default class TimeDB {
    async inserirDados(time) {
        
        if (time instanceof Time) {
            const conexao = await conectar();
            const sql = "INSERT INTO time (codigo, timeNome, tecnico, dataCriacao, patrocinador, corReferencial) \
                                           VALUES(?, ?, ?, ?, ?, ?)";
            const valores = [time.codigo, time.timeNome, time.tecnico, time.dataCriacao,
                             time.patrocinador, time.corReferencial];
            await conexao.query(sql, valores);
        }
    }

    async alterarDados(time) {
        
        if (time instanceof Time) {
            const conexao = await conectar();
            const sql = "UPDATE time SET timeNome = ?, tecnico = ?, dataCriacao = ?, patrocinador = ?, \
                                         corReferencial = ? \
                         WHERE codigo = ?";
            const valores = [time.timeNome, time.tecnico, time.dataCriacao, time.patrocinador, time.corReferencial, 
                             time.codigo];
            await conexao.query(sql, valores);
        }
    }

    async excluirDados(time) {
        
        if (time instanceof Time) {
            const conexao = await conectar();
            const sql = "DELETE FROM time WHERE codigo = ?";
            const valores = [time.codigo];
            await conexao.query(sql, valores);
        }
    }

    async consultarDados(especificidade) {
        const conexao = await conectar();
        const sql = "SELECT * FROM time WHERE timeNome LIKE ?";
        const valores = ['%' + especificidade + '%' ]
        const [rows] = await conexao.query(sql, valores);
        const listaTimes = [];
        for(const row of rows){
            const time = new Time(row['codigo'], row['timeNome'], row['tecnico'], row['dataCriacao'],
                                  row['patrocinador'], row['corReferencial'])
            listaTimes.push(time);
        }
        return listaTimes;
    }

    async consultarCodigo(codigo) {
        const conexao = await conectar();
        const sql = "SELECT * FROM time WHERE codigo =  ?";
        const valores = [codigo]
        const [rows] = await conexao.query(sql, valores);
        const listaTimes = [];
        for(const row of rows){
            const time = new Time(row['codigo'], row['timeNome'], row['tecnico'], row['dataCriacao'],
                                  row['patrocinador'], row['corReferencial'])
            listaTimes.push(time);
        }
        return listaTimes;
    }
}
