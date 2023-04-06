import express from 'express';
import rotaLogin from './rotas/rotaLogin.js';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';

const host = 'localhost';
const porta = 3006;

const app = express();

app.use(express.urlencoded({ extended: false }));


app.use(session({
    secret: "UnOEsTe2023AdS",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 35
    }
}));


app.use('/login', rotaLogin);

app.use(express.static('./publico'));

app.use(autenticar, express.static('./protegido'));

app.listen(porta, host, () => {
    console.log('servidor ativo em: http://' + host + ':' + porta);
});
