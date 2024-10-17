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

  const completarTarefa = (id) => {

    const tarefaCompleta = tarefasIncompletas.find((tarefa) => tarefa.id === id);

    if (tarefaCompleta) {

      setTarefasIncompletas(tarefasIncompletas.filter((tarefa) => tarefa.id !== id));
      setTarefasCompletas([...tarefasCompletas, { ...tarefaCompleta, completed: true }]);
    }

  };


  const divTarefasCompletas = () =>

    tarefasCompletas.map((tarefa) => (

      <div className="tarefaCompleta task" key={tarefa.id}>
          <p className="textStrike title">{tarefa.title}</p>
          <p>{interSec[tarefa.userId]}~</p> 
      </div>

    ));

  const divTarefasIncompletas = () =>

    tarefasIncompletas.map((tarefa) => (

      <div className="tarefaPendente task" key={tarefa.id} onClick={() => completarTarefa(tarefa.id)}>
          <p className="title">{tarefa.title}</p>
          <p>{interSec[tarefa.userId]}~</p>
      </div>

    ));

  return (
  <>
    <div className="conteudo">

      <h1>Lista de Tarefas</h1>

      <div className="tarefasPendentes">
        <h3>Tarefas Pendentes:</h3>
        {divTarefasIncompletas()}
      </div>

      <div className="tarefasCompletas">
        <h3>Tarefas Completas:</h3>
        {divTarefasCompletas()}
      </div>

    </div>
  </>
  );
};

export default App;