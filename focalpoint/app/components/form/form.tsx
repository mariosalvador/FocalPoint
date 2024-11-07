"use client";
import style from '@/app/styles/form.module.scss';
import { Dashed } from './dashed';
import { Plus, Square, Trash } from 'lucide-react';
import { SquareCheck } from '@/public/Checkbox';
import { useState } from 'react';
import { Modal } from '../modal/baseModal';


const data = [
    'Mara', 'João', 'Maria', 'Carlos', 'Ana',
    'Luis', 'Bruna', 'Felipe', 'Camila', 'Rafaela',
    'Gustavo', 'Fernanda', 'Lucas', 'Patrícia', 'Ricardo',
    'Beatriz', 'Gabriel', 'Larissa', 'Rafael', 'Juliana',
    'Tiago', 'Mariana', 'Rodrigo', 'Renata', 'André',
    'Daniela', 'Eduardo', 'Tatiana', 'Marcelo', 'Sofia',
    'Diogo', 'Isabel', 'Paulo', 'Simone', 'Pedro',
    'Carla', 'Leonardo', 'Alice', 'Flávio', 'Natália',
    'César', 'Luana', 'Antônio', 'Vanessa', 'Roberto',
    'Sandra', 'Fábio', 'Elisa', 'Henrique', 'Luciana'
];

export const Form = () => {
    const [isOpenModalNewTask, setIsOpenModalNewTask] = useState(false);
    const [isOpenModalDeleteTask, setIsOpenModalDeleteTask] = useState(false);
    const [task, setTask] = useState<string[]>(data); // Tarefas pendentes
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
        <section className={`w-full h-full flex px-10 space-x-1 `}  >
            <div className="w-full h-full mb-20 flex justify-between ">
                <div className=' w-full px-5 overflow-auto [&::-webkit-scrollbar]:hidden'>
                    <h2 className='mb-2 text-md font-medium text-black/50 '>Suas tarefas de hoje</h2>
                    <section className={`${style.toDo}`}>
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
                </div>

                <button className={`${style.button} p-1 w-[240px] h-[50px] flex justify-center items-center rounded-lg text-md font-medium text-white mt-[30px]`} onClick={OpenModalNewTask}>
                    <Plus/>
                    Adicionar nova tarefa
                </button>

            </div>
            <div className=' w-[0.4px] h-full  bg-black/15 '></div> {/*Divider */}

            <div className='w-[600px] h-full p-1 overflow-auto [&::-webkit-scrollbar]:hidden'>
                <h2 className='mb-2 text-md font-medium text-black/50 '>Tarefas Finalizadas</h2>
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


