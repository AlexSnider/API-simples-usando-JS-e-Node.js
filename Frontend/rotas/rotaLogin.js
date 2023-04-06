import { Router } from "express";

const rotaLogin = new Router();

rotaLogin.get('/', (requisicao, resposta) => {
    resposta.redirect('/login.html');
})
.post('/', (requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario && senha && usuario === 'alex' && senha === '123')
    {
        requisicao.session.usuarioLogado = true;
        resposta.redirect('/timeCadastro.html');
    }
    else{
        resposta.send("<h1>Parece que você não inseriu dados corretos...</h1><br/><button onclick='history.back()'>Recomeçar</button>")
    }
})

export default rotaLogin;
