const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  editora: String,
  autores: Number
});

module.exports = mongoose.model('Livro', LivroSchema);

