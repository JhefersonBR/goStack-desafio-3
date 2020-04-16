import React, { useEffect, useState } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    try {
      api.get('/repositories').then(response => {
        setRepositories(response.data);
      });
    } catch (error) {
      console.log(error);
    }

  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post('/repositories', {
        id: "123",
        url: "https://github.com/josepholiveira",
        title: `Desafio ReactJS ${Date.now()}`,
        techs: ["React", "Node.js"],
      });
      setRepositories([...repositories, response.data]);
    } catch (error) {
      alert("error");
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(repositories.filter(repository => {
        if (repository.id !== id) {
          return repository;
        }
      }));
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              {console.log(repositories)}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
                </button>
            </li>
          )
        })}


      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
