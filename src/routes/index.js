//LUGAR DONDE ESTAN TODAS LAS RUTAS DE LA APLICACIÓN
const express= require('express');
const router= express.Router(); //metodo router que devuelve un objeto 


router.get('/', (req, res)=>{
    res.send('Hello word');
});
module.exports = router;