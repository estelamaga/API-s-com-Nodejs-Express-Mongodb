const express = require('express');
const router = express.Router(); 
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Funções auxiliares

const createUserToken = (userId) =>{
    return jwt.sign({ id: userId }, 'es02te09la19', { expiresIn: '7d'});
}

//Exemplo de função sem Async await
// router.get('/', (req, res) => {
//     Users.find({}, (err, data) => {
//         if (err) return res.send({ error: 'Erro na consulta de usuario' });
//         return res.send(data);
//     });
//  });

 //Refatoração a função acima usando Async await
 router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    }
    catch (err) {
        return res.send({ error: 'Erro na na consulta do usuário'});
    }
 });

 //Exemplo de função sem async await
// router.post('/create', (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) return res.send({ error: 'Dados insuficientes!'});
    
//     Users.findOne({email}, (err, data) => {
//         if(err) return res.send({ error: 'Erro ao buscar usuário!'});
//         if(data) return res.send({ error: 'Usuário já cadastrado'});
        
//         Users.create(req.body, (err, data) =>{
//             if (err) return res. send({ error: 'Erro ao criar usuário!'});

//             data.password = undefined;
//             return res.send(data);
//         });
//     });
// });


//Refatoração da função com async e await
router.post('/create', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) return res.send({ error: 'Dados insuficientes!'});
        
    try {
        if (await Users.findOne({ email })) return res.send( { error: 'Usuário já cadastrado!'});
                
        const user = await Users.create(req.body);
        user.password = undefined;
        return res.send({user, token:createUserToken(user.id)});

    } catch (err) {
         return res.send({ error: 'Erro ao buscar usuário!'}); 
    }
});
 

//Criar um endpoint de autenticação
//Função sem async e await
// router.post('/auth', (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) return res.send({ error: 'Dados insuficientes!'});

//     Users.findOne({email}, (err, data) => {
//         if (err) return res.send({ error: 'Erro ao buscar usuário'});
//         if (!data) return res.send({ error: 'Usuário não registrado!'});

//         bcrypt.compare(password, data.password, (err, same) =>{
//             if (!same) return res.send({ error: 'Erro ao autenticar usuário!'});
//             data.password = undefined;
//             return res.send(data);
//         })

//     }).select('+password');
// });

//Criar um endpoint de autenticação para a rota
//Refatoração da função com async e await
router.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) return res.send({ error: 'Dados insuficientes!'});

    try {
       const user = await Users.findOne({ email }).select('+password');
       if (!user) return res.send( { error: 'Usuário não registrado'});

       const pass_ok =  await bcrypt.compare(password, user.password);
       if (!pass_ok) return res.send({ error: 'Erro ao autenticar usuário!'});

       user.password = undefined;
       return res.send({user, token:createUserToken(user.id)});

    } catch (err) {
        return res.send({ error: 'Erro ao buscar usuário!'});

    }

    
});
    module.exports = router;