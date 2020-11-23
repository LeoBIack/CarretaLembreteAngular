// importar o pacote 'mongoose'
const mongoose = require('mongoose');

// Definir o esquema dos nossos dados
const lembreteSchema = mongoose.Schema( {
  nome: {
    type: String,
    required: true
   },
  dataPrevista: {
    type: String,
    required: false,
  },

} );

// Criar um modelo associado ao esquema:
module.exports = mongoose.model('Lembrete', lembreteSchema)
