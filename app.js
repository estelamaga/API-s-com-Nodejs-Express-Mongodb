const express = require('express');
const app = express();


//Foi criado um endpoint que bate no endereço onde essa API vai estar instalada.
app.get('/', (req,res) => {
    let obj = req.query;
    return res.send({message: "Está funcionando o metodo GET. você enviou nome ${obj.nome} com idade ${obj.idade} anos"});
})

app.post('/', (req,res) => {
    return res.send({message: 'Está funcionando o método POST'});
})

app.listen(3000);

module.exports = app;