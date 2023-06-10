import React, { useState, useEffect } from 'react';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LinhaLivro = ({ livro, excluir }) => {
  const { _id, titulo, resumo, codEditora, autores } = livro;
  const nomeEditora = controleEditora.getNomeEditora(codEditora);

  const handleExcluir = () => {
    excluir(_id);
  };

  return (
    <tr>
      <td>
        {titulo}
        <br />
        <button
          style={{ backgroundColor: '#dc3545', color: '#fff' }}
          onClick={handleExcluir}
        >
          Excluir
        </button>
      </td>
      <td>{resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        <ul>
          {autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

const LivroLista = () => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const obterLivros = async () => {
      try {
        const livros = await controleLivro.obterLivros();
        setLivros(livros);
        setCarregado(true);
      } catch (error) {
        console.error('Erro ao obter livros:', error);
      }
    };

    if (!carregado) {
      obterLivros();
    }
  }, [carregado]);

  const excluir = (_id) => {
    controleLivro.excluir(_id)
      .then(() => {
        setCarregado(false);
      })
      .catch((error) => {
        console.error('Erro ao excluir livro:', error);
      });
  };

  return (
    <main>
      <h1>Catálogo de Livros</h1>
      <table className="table">
        <thead className="bg-dark text-white">
          <tr>
            <th>Título</th>
            <th>Resumo</th>
            <th>Editora</th>
            <th>Autores</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <LinhaLivro key={livro._id} livro={livro} excluir={excluir} />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default LivroLista;
