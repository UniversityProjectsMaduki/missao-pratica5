const Livro = require('./livro-schema');

const obterLivros = async () => {
  try {
    const livros = await Livro.find();
    return livros;
  } catch (error) {
    throw new Error(`Erro ao obter os livros: ${error}`);
  }
};

const incluir = async (livro) => {
  try {
    const livroIncluido = await Livro.create(livro);
    return livroIncluido;
  } catch (error) {
    throw new Error(`Erro ao incluir o livro: ${error}`);
  }
};

const excluir = async (codigo) => {
  try {
    await Livro.deleteOne({ _id: codigo });
  } catch (error) {
    throw new Error(`Erro ao excluir o livro: ${error}`);
  }
};

module.exports = {
  obterLivros,
  incluir,
  excluir,
};
