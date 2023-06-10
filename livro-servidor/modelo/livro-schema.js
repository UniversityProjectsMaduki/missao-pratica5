const banco = require('./conexao');

const LivroSchema = new banco.Schema({
  _id: banco.Schema.Types.ObjectId,
  titulo: String,
  CodEditora: Number,
  resumo: String,
  autores: [String],
});

const Livro = banco.model('Livro', LivroSchema, 'livros');

module.exports = Livro;
