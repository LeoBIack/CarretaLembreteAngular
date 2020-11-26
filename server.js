const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const http = require ('http');
const app2 = require ('./backend/app2');
app2.set('port', 3000);
const server = http.createServer(app2);
server.listen(3000);


const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose 
  .connect('mongodb+srv://user:12345@cluster0.1zrgk.mongodb.net/desgraca?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conexão realizada com sucesso ao MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Erro de conexão", err);
    process.exit();
  });


app.get("/", (req, res) => {
});


require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`O servidor está conectado a porta ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });
  
    }
  });
}
