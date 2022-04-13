const express = require('express');
const app = express();
const BodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')

// Database
connection.authenticate().then(()=>console.log('conectou ao banco de dados')).catch((msgErro)=>console.log(msgErro))

// Utilizando a View Engine ejs
app.set('view engine','ejs');
app.use(express.static('public'))

app.use(BodyParser.urlencoded({extended:false}));
app.use(BodyParser.json());

app.get("/",(req, res) => {
    Pergunta.findAll({order:[['id','DESC']]}).then(perguntas=>{
        res.render("index",{perguntas:perguntas});
        // console.log(perguntas)
    })
})

app.get("/perguntar",(req,res) => {
    res.render("perguntar")
})

app.post("/salvarpergunta",(req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    })
})

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({where:{id: id}}).then(pergunta => {
        if(pergunta != undefined) {
            Resposta.findAll({where:{perguntaId: pergunta.id},order:[['id','DESC']]}).then(resposta =>
                res.render("pergunta",{pergunta: pergunta,resposta: resposta})
            )
        }else{
            res.redirect("/")
        }
    })
})

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaid
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => res.redirect("pergunta/"+perguntaId))
})

app.listen(8080,()=>{console.log("Servidor Online")});