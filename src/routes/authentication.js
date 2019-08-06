//Singin, logoutm. 

const express = require('express');
const router = express.Router();


//ruta para renderizar el formulario de usuario
router.get('/signup', (req, res) =>{
    res.render('auth/signup');
});

//ruta para recibir los datos del formulario de usuarios
router.post('/signup', (req, res) =>{

});

module.exports= router;