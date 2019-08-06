//alamacena, elimianar, actualizar, listar.

const express = require("express");
const router = express.Router();

const pool = require("../database");

//creacion de enlace recibir las propiedades y envio a la bd
router.get("/add", (req, res) => {
  res.render("links/add");
});

//creacion del metodo post para que el formulario de add envie los datos a la bd
router.post("/add", async (req, res) => {
  const { title, url, description } = req.body; // destructurin= req.body  desde este objeto quiero estas propiedades
  const newLink = {
    title,
    url,
    description
  };
  await pool.query("INSERT INTO links set?", [newLink]); // alamecenamiento de las propiedades de req.body=newLink
  req.flash("mensaje", "Link guardado satisfactoriamente");
  res.redirect("/links");
});

//creacion de enlace para crear la lista de links creados
// pide a la bd todos los enlaces guardados
//envia los links a el archivo list en views

router.get("/", async (req, res) => {
  const links = await pool.query("SELECT * FROM links");
  res.render("links/list", { links });
});

//creacion de la ruta delete
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params; //desde req.params necesito la propiedad id
  await pool.query("DELETE FROM links WHERE ID = ?", [id]); //consulta a la bd para que elimine el id
  req.flash("mensaje", "Link borrado satisfactoriamente");
  res.redirect("/links");
});


//creaacion de las rutasa edit
router.get("/edit/:id", async (req, res) => {
  const { id } = req.params; //console.log(id) verificamos que se recibe el id, colocar res.send para evitar que la pagina cargue.
  const links = await pool.query("SELECT * FROM links WHERE id=?", [id]); //consulta al bd para que retorne los datos que le corresponde al id y se almacenan en links
  console.log(links[0]); //para ver el arreglo obtenido
  res.render("links/edit", { link: links[0] }); //renderiza la pagina edit y pobla el formulario con los datos que se extrajeron de la bd
});



router.post("/edit/:id", async (req, res) => {
  const { id } = req.params; //aseguramos la llegada del id
  const { title, description, url } = req.body; //obtenemos los datos del formulario
  const newLink = {                              //guardamos los datos del formulario en una nueva variable
    title,
    url,
    description
  };
  //console.log(newLink);
  await pool.query("UPDATE links set ? WHERE id=?", [newLink, id]); //actualiza desde la tabla links este cojunto de datos que coincidan con el id
  req.flash("mensaje", "Link editado satisfactoriamente"); 
  res.redirect("/links");
});

module.exports = router;
