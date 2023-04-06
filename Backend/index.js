import cors from 'cors';
import express from 'express';
import rotaTime from './Rotas/rotaTime.js';

const app = express();

app.use(cors({origin:'*'}));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/time', rotaTime);
app.listen(3005, 'localhost', ()=>{
    console.log("API escutando no link: http://localhost:3005/time")
})
