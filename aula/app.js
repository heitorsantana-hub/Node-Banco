const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const { builtinModules } = require('module');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "cimatec",
    database: 'teste'
});

connection.connect(err => {
    if(err){
        console.error('Erro', err.message);
        return;
    }
    console.log("Sucesso");
    //connection.end();
});

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, 'public', 'site.html'));
});

app.post('/salvar', (req,res) =>{
    const { nome,email,telefone } = req.body;
    const sql = 'INSERT INTO usuarios (nome,email,telefone) VALUES (?,?,?)';
    connection.query(sql, [nome,email,telefone], (err) => {
        if(err){
            console.error('Error ao inserir dados: ', err.message);
            return res.send('Erro ao salvar no banco.')
            }
        res.send('Dados salvos com sucesso');
    });
});

app.listen(3007, () => console.log('Servidor rodando em http://localhost:3007'));   