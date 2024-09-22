"use client";
import style from '@/app/styles/form.module.scss';
import { Dashed } from './dashed';
import { Square, Trash } from 'lucide-react';
import { SquareCheck } from '@/public/Checkbox';
import { useState } from 'react';
import { Modal } from '../modal/baseModal';

export const Form = () => {
    const [isOpenModalNewTask, setIsOpenModalNewTask] = useState(false);
    const [isOpenModalDeleteTask, setIsOpenModalDeleteTask] = useState(false);
    const [task, setTask] = useState<string[]>([]); // Tarefas pendentes
    const [completedTasks, setCompletedTasks] = useState<string[]>([]); // Tarefas finalizadas
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null); // Tarefa a ser deletada

    // Adicionar nova tarefa ao estado de pendentes
    const addTaskOnState = (newTask: string) => {
        if (task.includes(newTask)) {
            alert('Já existe essa tarefa!');
        } else {
            setTask((prevState) => [...prevState, newTask]);
            setIsOpenModalNewTask(false); 
        }
    };

    // Mover tarefa para tarefas finalizadas
    const completeTask = (taskLabel: string) => {
        setTask((prevState) => prevState.filter((t) => t !== taskLabel));
        setCompletedTasks((prevCompleted) => [...prevCompleted, taskLabel]);
    };

    // Mover tarefa de finalizadas para pendentes
    const undoTask = (taskLabel: string) => {
        setCompletedTasks((prevState) => prevState.filter((t) => t !== taskLabel));
        setTask((prevPending) => [...prevPending, taskLabel]);
    };

    // Função para deletar a tarefa
    const deleteTaskFromState = () => {
        if (taskToDelete) {
            setTask((prevState) => prevState.filter((t) => t !== taskToDelete));
            setCompletedTasks((prevState) => prevState.filter((t) => t !== taskToDelete));
            setIsOpenModalDeleteTask(false); 
            setTaskToDelete(null); 
        }
    };

    // Abre modal para adicionar nova tarefa
    function OpenModalNewTask() {
        setIsOpenModalNewTask(true);
    }

    // Abre modal para deletar tarefa e define a tarefa a ser deletada
    function OpenModalDeleteTask(taskLabel: string) {
        setTaskToDelete(taskLabel);
        setIsOpenModalDeleteTask(true);
    }

    function CloseModal() {
        setIsOpenModalDeleteTask(false);
        setIsOpenModalNewTask(false);
        setTaskToDelete(null); 
    }

    return (
        <section className={style.section}>
            <div className={style.div}>
                <h2>Suas tarefas de hoje</h2>
                <section className={style.toDo}>
                    {task.map((value) => (
                        <Dashed
                            key={value}
                            label={value}
                            squareIcon={<Square className={style.icon} />}
                            checked={() => completeTask(value)} 
                            binIcon={<Trash onClick={() => OpenModalDeleteTask(value)} className={style.icon} />}
                        />
                    ))}
                </section>

                <h2>Tarefas Finalizadas</h2>
                <section className={style.toDo}>
                    {completedTasks.map((value) => (
                        <Dashed
                            key={value}
                            label={value}
                            squareCheckedIcon={<SquareCheck />}
                            checked={() => undoTask(value)} 
                            binIcon={<Trash onClick={() => OpenModalDeleteTask(value)} className={style.icon} />}
                        />
                    ))}
                </section>
            </div>

            <button className={style.button} onClick={OpenModalNewTask}>
                Adicionar nova tarefa
            </button>

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
