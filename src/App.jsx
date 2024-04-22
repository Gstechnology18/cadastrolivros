import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [Livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    isbn: '',
    titulo: '',
    editora: '',
    autor: '',
    genero: '',
  });

  useEffect(() => {
    fetchLivros();
  }, []);

  async function fetchLivros() {
    try {
      const response = await axios.get('http://localhost:8090/Livros');
      console.log('Livros:', response.data); // Adicionando console log
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoLivro((prevLivro) => ({
      ...prevLivro,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8090/Livros', novoLivro);
      console.log('Livro criado:', novoLivro); // Adicionando console log
      fetchLivros();
      setNovoLivro({
        isbn: '',
        titulo: '',
        editora: '',
        autor: '',
        genero: '',
      });
    } catch (error) {
      console.error('Erro ao criar livro:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/Livros/${id}`);
      console.log('Livro excluído:', id); // Adicionando console log
      fetchLivros();
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  };

  const handleUpdate = async (id, LivroAtualizado) => {
    try {
      await axios.put(`http://localhost:8090/Livros/${id}`, LivroAtualizado);
      console.log('Livro atualizado:', LivroAtualizado); // Adicionando console log
      fetchLivros();
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  return (
    <div>
      <h1>Gerenciamento de livros</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="isbn"
          placeholder="isbn"
          value={novoLivro.isbn}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="titulo"
          placeholder="titulo"
          value={novoLivro.titulo}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="editora"
          placeholder="editora"
          value={novoLivro.editora}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="autor"
          placeholder="autor"
          value={novoLivro.autor}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="genero"
          placeholder="genero"
          value={novoLivro.genero}
          onChange={handleInputChange}
        />
        <button type="submit">Adicionar Livro</button>
      </form>
      <ul>
        {Livros.map((Livro) => (
          <li key={Livro.id}>
            {Livro.id} - {Livro.isbn} {Livro.titulo} {Livro.editora} {Livro.autor} {Livro.genero}
            <button onClick={() => handleDelete(Livro.id)}>Excluir</button>
            <button
            onClick={() => {
            const updatedBooks = Livros.map(book => {
              if (book.id === Livro.id) {
                return {
                  ...book,
                  isbn: novoLivro.isbn || book.isbn,
                  titulo: novoLivro.titulo || book.titulo,
                  editora: novoLivro.editora || book.editora,
                  autor: novoLivro.autor || book.autor,
                  genero: novoLivro.genero || book.genero,
                };
              }
              return book;
            });
            handleUpdate(Livro.id, updatedBooks.find(book => book.id === Livro.id));
          }}
        >
          Atualizar
        </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
