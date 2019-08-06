const {format}= require('timeago.js');

//creacion de metodo para convertir el formato de fecha
const helpers ={};

//create_at nomnbre de la variable que se usa en la base de datos para la fecha
helpers.timeago = (create_at) =>{
   return format(create_at);
};

module.exports = helpers;