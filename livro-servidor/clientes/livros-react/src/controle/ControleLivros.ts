import Livro from '../modelo/Livro';


const baseURL = 'http://localhost:3030/livros';

interface LivroMongo {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

export class ControleLivros {
  async obterLivros(): Promise<Array<LivroMongo>> {
    const response = await fetch(baseURL);
    const livros: Array<LivroMongo> = await response.json();
    return livros;
  }

  async incluir(livro: Livro): Promise<void> {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(livro)
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Erro ao incluir livro');
    }
  }
  
  

  async excluir(_id: string): Promise<void> {
    const response = await fetch(`${baseURL}/${_id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Erro ao excluir livro');
    }
  }
}
