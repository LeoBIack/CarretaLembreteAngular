const express = require ('express');
const app2 = express();
const bodyParser = require ('body-parser');

const mongoose = require('mongoose');

const Lembrete = require('./models/lembrete')

app2.use (bodyParser.json());

mongoose.connect('mongodb+srv://user:12345@cluster0.1zrgk.mongodb.net/desgraca?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true
   })
  .then(() => {
    console.log("Conexão OK!");
  })
  .catch((error) => {
    console.log("Conexão não funcionou!");
    console.log(error);
  })


app2.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

  next();
});

app2.get('/api/lembretes', (req, res, next) => {
  Lembrete.find().then(
    documents => {
      res.status(200).json(
        {
          mensagem: "Tudo OK",
          lembretes: documents
        }
      );
    }
  );
});

app2.post('/api/lembretes', (req, res, next) => {
  const lembrete = new Lembrete({
    nome: req.body.nome,
    previstaDate: req.body.previstaDate,
  });

  lembrete.save()
    .then (lembreteInserido => {
      res.status(201).json({
        mensagem: 'lembrete inserido',
        id: lembreteInserido._id
      })
    })
  });

app2.delete('/api/lembretes/:id', (req, res, next) => {

  Lembrete.deleteOne ({_id: req.params.id}).then((resultado) => {
    console.log (resultado);
    res.status(200).json({mensagem: "lembrete removido"})
  });
});

app2.put("/api/lembretes/:id", (req, res, next) => {

  const lembrete = new Lembrete({
    _id: req.params.id,
    nome: req.body.nome,
    previstaDate: req.body.previstaDate,
  });

  Lembrete.updateOne({
      _id: req.params.id
    },
    lembrete
  ).then( (resultado) => {
    console.log(resultado);
  });
  res.status(200).json({
    mensagem: 'Atualização realizada com sucesso!'
  });

});

module.exports = app2;
