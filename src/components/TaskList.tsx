import { useEffect, useState } from "react";

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask(task:Task) {
    if(!newTaskTitle)return 
    setTasks([...tasks,{
      id:uuidv4(),
      title:newTaskTitle,
       isComplete: false}] );
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
  }

  function handleToggleTaskCompletion(id: string) {

    const newTasks = tasks.map(task=>task.id ===id?{
      ...task,isComplete: !task.isComplete} :task
    );
    // const ind= tasks.findIndex((item)=>item.id === id);
    // const newTasks = tasks.filter(()=>id !== '0');
   
// Aparentemente o useState só atualiza se voce utiliza funcoes construtoras, entao "Const newTasks = tasks" nao funciona.

    // newTasks[ind].isComplete = !newTasks[ind].isComplete;
    


    setTasks(newTasks)
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  }
  function handleRemoveTask(id: string) {
    // Remova uma task da listagem pelo ID
    const newTasks = tasks.filter(task=> task.id !== id)

    setTasks(newTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}