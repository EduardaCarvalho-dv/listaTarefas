/* eslint-disable react/prop-types */
import "../../App.css";

export const TarefasCompletas = ({ tarefa, userName }) => {
  console.log(tarefa);
  return (
    <div className="tarefaCompleta task" key={tarefa.id}>
      <p>{tarefa.title}</p>
      <p>{userName}</p>
    </div>
  );
};

export const TarefasIncompletas = ({ tarefa, userName, completarTarefa }) => {
    console.log(tarefa);
    return (
        <div className="tarefaPendente task" key={tarefa.id} onClick={() => completarTarefa(tarefa.id)}>
        <p>{tarefa.title}</p>
        <p>{userName}</p>
      </div>
    );
  };