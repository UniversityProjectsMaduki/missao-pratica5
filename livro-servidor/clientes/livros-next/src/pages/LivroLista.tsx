import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { LinhaLivro } from '../../componentes/LinhaLivro'
import { Menu } from '../../componentes/Menu'
import styles from '../styles/Home.module.css'
import { Livro } from '../../classes/modelo/Livro'
import { ControleLivro } from '../../classes/controle/ControleLivros'

const controleLivros = new ControleLivro()
const LivroLista: NextPage = () => {
  const [livros, setLivros] = useState<Livro[]>([])
  const [carregado, setCarregado] = useState(false)

  useEffect(() => {
    if (!carregado) {
      controleLivros.obterTodos().then(data => { 
        setLivros(data)
        setCarregado(true)
      })
    }
  }, [carregado])

  const excluir = (codigo: string) => { 
    controleLivros.excluir(codigo).then(() => setCarregado(false))
  }

  return (
    <div className={styles.container}>
      <Menu />
      <main className={styles.main}>
        <h1 >Lista de Livros</h1>
        <table className="table table-striped">
          <thead className='table-dark'>
            <tr>
              <th>Título</th>
              <th>Editora</th>
              <th>Resumo</th>
              <th>Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => ( 
              <LinhaLivro key={index} livro={livro} excluir={excluir} />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default LivroLista
