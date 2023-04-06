import TimeBD from '../Persistencia/TimeDB.js'
export default class Time{
    #codigo;
    #timeNome;
    #tecnico;
    #dataCriacao;
    #patrocinador;
    #corReferencial;

    constructor(codigo, timeNome, tecnico, dataCriacao, patrocinador, corReferencial){
        this.#codigo = codigo;
        this.#timeNome = timeNome;
        this.#tecnico = tecnico;
        this.#dataCriacao = dataCriacao;
        this.#patrocinador = patrocinador;
        this.#corReferencial = corReferencial;
    }

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get timeNome(){
        return this.#timeNome;
    }

    set timeNome(novoNome){
        this.#timeNome = novoNome;
    }

    get tecnico(){
        return this.#tecnico;
    }

    set tecnico(novoTecnico){
        this.#tecnico = novoTecnico;
    }

    get dataCriacao(){
        return this.#dataCriacao;
    }

    set dataCriacao(novadataCriacao){
        this.#dataCriacao = novadataCriacao;
    }

    get patrocinador(){
        return this.#patrocinador;
    }

    set patrocinador(novoPatrocinador){
        this.#patrocinador = novoPatrocinador;
    }


    get corReferencial(){
        return this.#corReferencial;
    }

    set corReferencial(novaCorReferencial){
        this.#corReferencial = novaCorReferencial;
    }

    toJSON(){
        return{
            "codigo"         : this.#codigo,
            "timeNome"       : this.#timeNome,
            "tecnico"        : this.#tecnico,
            "dataCriacao"    : this.#dataCriacao,
            "patrocinador"   : this.#patrocinador,
            "corReferencial" : this.#corReferencial,
        }
    }

    async gravar(){
        const timeBD = new TimeBD();
        await timeBD.inserirDados(this);
    }

    async atualizar(){
        const timeBD = new TimeBD();
        await timeBD.alterarDados(this);
    }

    async excluirDados(){
        const timeBD = new TimeBD();
        await timeBD.excluirDados(this);
    }

    async consultar(especificidade){
        const timeBD = new TimeBD();
        const times = await timeBD.consultarDados(especificidade);
        return times;
    }

    async consultarCodigo(codigo){
        const timeBD = new TimeBD();
        const times = await timeBD.consultarCodigo(codigo);
        return times;
    }
}
