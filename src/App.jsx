import { useState, useEffect } from 'react';

import "./App.css";

function App() {
  
  const [tarefasCompletas, setTarefasCompletas] = useState([]);
  const [tarefasIncompletas, setTarefasIncompletas] = useState([]);

  const [interSec, setInterSec] = useState([]);

  useEffect(() => {

    async function listarDados(){

      try {

        const tarefasCadastradas = "https://jsonplaceholder.typicode.com/todos";
        const dadosUsuarios = "https://jsonplaceholder.typicode.com/users";

        const [tarefasDados, usuariosDados] = await Promise.all([
          fetch(tarefasCadastradas), fetch(dadosUsuarios),
        ]);

        const usuarios = await usuariosDados.json();
        const tarefas = await tarefasDados.json();

        const interSec = {};

        usuarios.forEach((user) => {

          interSec[user.id] = user.name;
        });

        setInterSec(interSec);

        setTarefasCompletas(tarefas.filter((tarefa) => tarefa.completed));
        setTarefasIncompletas(tarefas.filter((tarefa) => !tarefa.completed));
      } catch (error) {
        console.error("Erro!", error);
      };
    };

    listarDados();
  }, []);


  const divTarefasCompletas = () =>

    tarefasCompletas.map((tarefa) => (

      <div className="tarefaCompleta" key={tarefa.id}>
        <li>
          {interSec[tarefa.userId]}, <strike> {tarefa.title} </strike>
        </li>
      </div>

    ));

  const divTarefasIncompletas = () =>

    tarefasIncompletas.map((tarefa) => (

      <div className="tarefaPendente" key={tarefa.id}>
        <li>
          {interSec[tarefa.userId]}, {tarefa.title}
        </li>
      </div>

    ));

  return (
  <>
    <div className="conteudo">

      <h1>Lista de Tarefas</h1>

      <div className="tarefasCompletas">
        <h3>Tarefas Completas:</h3>
        {divTarefasCompletas()}
      </div>
      <div className="tarefasPendentes">
        <h3>Tarefas Pendentes:</h3>
        {divTarefasIncompletas()}
      </div>

    </div>
  </>
  );
};

export default App;