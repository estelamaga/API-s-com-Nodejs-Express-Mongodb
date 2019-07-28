const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    return res.send({message: 'Tudo ok com o metodo GET da rota do usuario.' });
});

router.post('/', (req, res) => {
    return res.send({message: 'Tudo ok com o metodo POST da rota do usuario.'});
});

router.post('/create', (req, res) => {
    return res.send({message: 'usuario criado com sucesso'});
});
module.exports = router;