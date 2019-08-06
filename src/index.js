const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path"); //une directorios

const flash = require('connect-flash');
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const { database } = require("./keys");

//INITIALIZATIONS
const app = express();

//SETINGS
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views")); //se le indica a node donde se encuentra la carpeta views

//config engine
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main", //plantilla principal
    layoutsDir: path.join(app.get("views"), "layouts"), //se le indica donde esta la carpeta layouts
    partialsDir: path.join(app.get("views"), "partials"), //se le indica donde esta la carpeta layouts
    extname: ".hbs", //se le asigna el nombre de la extension al engine
    helpers: require("./lib/handlebars")
  })
);
app.set("view engine", ".hbs");

// MIDDLEWARES

//Uso de flash

app.use(
  session({
    secret: "carmysqlnodesession",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  })
);

app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //recibe formatos string
app.use(express.json()); //recibe json

//GLOBAR VARIABLES
app.use((req, res, next) => {
  app.locals.mensaje = req.flash("mensaje"); // el mensaje estara disponible en todas las vistas
  next();
});

//ROUTES
app.use(require("./routes/"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links")); //prefijo '/links' para se pidan las rutas tengan esa ruta inicial

//PUBLIC

app.use(express.static(path.join(__dirname, "public"))); //se le indica donde estara la carpeta publica

//STARTING THE SERVER
app.listen(app.get("port"), () => {
  console.log("Server on Port", app.get("port"));
});
