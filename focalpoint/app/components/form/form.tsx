"use client";

import style from '@/app/styles/form.module.scss';
import { Dashed } from './dashed';
import { Plus, Square, Trash } from 'lucide-react';
import { SquareCheck } from '@/public/Checkbox';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from '../modal/baseModal';


export const Form = () => {
    const [isOpenModalNewTask, setIsOpenModalNewTask] = useState(false);
    const [isOpenModalDeleteTask, setIsOpenModalDeleteTask] = useState(false);
    const [task, setTask] = useState<string[]>([]);
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);


    const addTaskOnState =async (newTask: string) => {
        if (task.includes(newTask)) {
            alert('Já existe essa tarefa!');
            return;
        }
    
        try {
            const taskData = {
                nameToDo: newTask,
                createAt: new Date(), 
                finishedAt: new Date(), 
            };
     setIsOpenModalNewTask(false);
           await axios.post('http://127.0.0.1:3000/api/toDo', taskData);
           
            // console.log('Tarefa cadastrada com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao cadastrar tarefa:', error);
        }
    };
    

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/toDo'); 
            const tasks = response.data; 
            setTask(tasks.map((task: { nameToDo: string }) => task.nameToDo));
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        }
    };

    // Chama a função fetchTasks quando o componente é montado
    useEffect(() => {
        fetchTasks();
    }, [task]);

    const completeTask = (taskLabel: string) => {
        setTask((prevState) => prevState.filter((t) => t !== taskLabel));
        setCompletedTasks((prevCompleted) => [...prevCompleted, taskLabel]);
    };

    const undoTask = (taskLabel: string) => {
        setCompletedTasks((prevState) => prevState.filter((t) => t !== taskLabel));
        setTask((prevPending) => [...prevPending, taskLabel]);
    };

    // const deleteTaskFromState = () => {
    //     if (taskToDelete) {
    //         setTask((prevState) => prevState.filter((t) => t !== taskToDelete));
    //         setCompletedTasks((prevState) => prevState.filter((t) => t !== taskToDelete));
    //         setIsOpenModalDeleteTask(false);
    //         setTaskToDelete(null);
    //     }
    // };

    const deleteTaskFromState = async () => {
        if (taskToDelete) {
          try {
            const response = await axios.delete('/api/toDo', {
              data: { nameToDo: taskToDelete },
            });
      
            if (response.status === 200) {
              setTask((prevState) => prevState.filter((t) => t !== taskToDelete));
              setCompletedTasks((prevState) => prevState.filter((t) => t !== taskToDelete));
              console.log('Tarefa deletada com sucesso:', taskToDelete);
            } else {
              console.warn('Tarefa não encontrada ou erro ao deletar.');
            }
          } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
          }
      
          setIsOpenModalDeleteTask(false);
          setTaskToDelete(null);
        }
      };
      

    function OpenModalNewTask() {
        setIsOpenModalNewTask(true);
    }

    function OpenModalDeleteTask(taskLabel: string, task: string) {
        setTaskToDelete(taskLabel);
        setIsOpenModalDeleteTask(true);
        console.log(task)

    }

    function CloseModal() {
        setIsOpenModalDeleteTask(false);
        setIsOpenModalNewTask(false);
        setTaskToDelete(null);
    }

    return (
        <section className="w-full h-full flex px-10 space-x-1">
            <div className="w-full h-full mb-20 flex justify-between">
                <div className="w-full px-5 overflow-auto [&::-webkit-scrollbar]:hidden">
                    <h2 className="mb-2 text-md font-medium text-black/50">Suas tarefas de hoje</h2>
                    <section className={style.toDo}>
                        {task.map((value) => (
                            <Dashed
                                key={value}
                                label={value}
                                squareIcon={<Square className={style.icon} />}
                                checked={() => completeTask(value)}
                                binIcon={<Trash onClick={() => OpenModalDeleteTask(value, value)} className={style.icon} />}
                            />
                        ))}
                    </section>
                </div>

                <button className={`${style.button} p-1 w-[240px] h-[50px] flex justify-center items-center rounded-lg text-md font-medium text-white mt-[30px]`} onClick={OpenModalNewTask}>
                    <Plus /> Adicionar nova tarefa
                </button>
            </div>

            <div className="w-[0.4px] h-full bg-black/15"></div>

            <div className="w-[600px] h-full p-1 overflow-auto [&::-webkit-scrollbar]:hidden">
                <h2 className="mb-2 text-md font-medium text-black/50">Tarefas Finalizadas</h2>
                <section className={style.toDo}>
                    {completedTasks.map((value) => (
                        <Dashed
                            key={value}
                            label={value}
                            squareCheckedIcon={<SquareCheck />}
                            checked={() => undoTask(value)}
                            binIcon={<Trash onClick={() => OpenModalDeleteTask(value, value)} className={style.icon} />}
                        />
                    ))}
                </section>
            </div>

            {isOpenModalNewTask && (
                <div className={style.modal_overlay}>
                    <Modal
                        tittleModal="Nova tarefa"
                        titleTask="Título"
                        cancelButton={CloseModal}
                        getTask={addTaskOnState}
                    />
                </div>
            )}

            {isOpenModalDeleteTask && (
                <div className={style.modal_overlay}>
                    <Modal
                        tittleModal="Deletar tarefa"
                        askOnRemove="Tem certeza que você deseja deletar essa tarefa?"
                        cancelButton={CloseModal}
                        deleteTask={deleteTaskFromState}
                        getTask={() => ''}
                    />
                </div>
            )}
        </section>
    );
};
