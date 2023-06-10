import { Injectable } from '@angular/core';
import Livro from './livro';

interface LivroMongo {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {

  baseURL = 'http://localhost:3030/livros';
  constructor() { }

  async obterLivros(): Promise<Livro[]> {
    const response = await fetch(this.baseURL, { method: 'GET' });
    const data = await response.json();
    return data.map((livro: LivroMongo) => new Livro(
      livro._id || '',
      livro.codEditora,
      livro.titulo,
      livro.resumo,
      livro.autores
    ));
  }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      _id: null,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };

    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(livroMongo),
    });

    return response.ok;
  }

  async excluir(codigo: String): Promise<boolean> {
    const response = await fetch(`${this.baseURL}/${codigo}`, { method: 'DELETE' });
    return response.ok;
  }
}
