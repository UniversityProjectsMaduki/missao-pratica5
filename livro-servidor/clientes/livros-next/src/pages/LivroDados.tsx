import type { NextPage } from 'next';
import React, { useState } from 'react';
import { ControleEditora } from '../../classes/controle/ControleEditora';
import { Livro } from '../../classes/modelo/Livro';
import { Menu } from '../../componentes/Menu';
import styles from '../styles/Home.module.css';
import { ControleLivro } from '../../classes/controle/ControleLivros';
import { useRouter } from 'next/router';

const controleEditora = new ControleEditora();
const controleLivros = new ControleLivro();

const LivroDados: NextPage = () => {
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState('');
  const opcoes = controleEditora.getEditoras().map(editora => ({ value: editora.codEditora, text: editora.nome }));
  const router = useRouter();

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(event.target.value);
  }

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const livro = new Livro('', titulo, resumo, autores.split('\n'), Number(codEditora));

    await controleLivros.incluir(livro);
    router.push('/LivroLista');
  }

  return (
    <div className={styles.container}>
      <Menu />
      <main className={styles.main}>
        <h1>Dados do Livro</h1>
        <form onSubmit={incluir}>
          <label className="form-label">
            Título:
            <br />
            <input
              className="form-control" type="text"
              value={titulo} 
              onChange={e => setTitulo(e.target.value)} style={{ width: '700px' }} />
          </label>
          <br />
          <label className="form-label">
            Resumo:
            <br />
            <textarea
              className="form-control" rows={3}
              value={resumo} 
              onChange={e => setResumo(e.target.value)} style={{ width: '700px' }} />
          </label>
          <br />
          <label className="form-label">
            Editora:
            <br />
            <select
              className="form-control"
              value={codEditora} 
              onChange={tratarCombo} style={{ width: '700px' }}>
              {opcoes.map((opcao, index) => (
                <option key={index} value={opcao.value}>{opcao.text}</option>
              ))}
            </select>
          </label>
          <br />
          <label className="form-label">
            Autores:
            <br />
            <textarea
              className="form-control"
              rows={3}
              value={autores}
              onChange={e => setAutores(e.target.value)}
              style={{ width: '700px' }}
              placeholder="Insira um autor por linha" />
          </label>
          <br />
          <button type="submit" className="btn btn-primary mb-3">Salvar Dados</button>
        </form>
      </main>
    </div>
  );
}

export default LivroDados;
