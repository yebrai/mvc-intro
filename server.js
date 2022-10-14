// Gets access to environment variables/settings
require('dotenv').config()


// Connects to the database... if we had one :( 
  const mongoose = require("mongoose")
  const MONGO_URI = "mongodb://localhost/studentsdb"
  
  mongoose.connect(MONGO_URI)
  .then((response) => {
    console.log("Conectados a la base de datos")
  })
  .catch((err) => {
    console.log("Error conectando", err)
  })                             

// Handles http requests (express is node js framework)
const express = require('express');
const app = express();


// Handles the handlebars
const hbs = require("hbs");


// This part runs most pieces of middleware
app.use(express.static("public"))
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views/' )
// morgan
const logger = require("morgan")
app.use(logger("dev"))
// serve.favicon
const favicon = require("serve-favicon")
app.use(favicon(__dirname + "/public/images/favicon.ico"))


// Local Variables 
// en app.locals crear una propiedad con cualquier nombre y valor
// accesible en cualquier lugar de HBS
app.locals.webName = "Estudiantes de Ironhack"

const Student = require('./models/Students.model')

// 👇 Start handling routes here
app.get('/', (req, res) => {
  res.render("home.hbs")
})

app.get('/about', (req, res) => {
  res.render("about.hbs")
})

app.get('/my-hobbies', (req, res) => {
  res.render("my-hobbies.hbs")
})

app.get("/users", (req, res, next) => {
  // next indica, quiero que pases a la proxima ruta
  // next() => sin argumento. Directamente salta a la proxima ruta
  // next(arg) => con 1 argumento. pasa al error handler de tipo 500

  //1 buscamos a todos los estudiantes
  Student.find()
  .then((response) => {
    console.log(response)
 
    //2 renderizamos una vista con la data
    res.render("total-users.hbs", {
      totalUsers: response
    })
  })
  .catch((err)=> {
    // console.log(err)
    // res.render("error.hbs")
    next(err)
  })

})

// To handle errors.
// 404 errors
app.use((req, res) => {
  // esto es algo que se va a ejecutar siempre, si no se consige ruta anterior.
  res.status(404).render("not-found.hbs")
  
})

// 500 errors
// el middleware es de tipo 500 por tener 4 argumentos
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).render("error.hbs")

})


// Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});