"use client";
import style from '@/app/styles/form.module.scss';
import { Dashed } from './dashed';
import { Plus, Square, Trash } from 'lucide-react';
import { SquareCheck } from '@/public/Checkbox';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from '../modal/baseModal';

// const data = [
//     'Mara', 'João', 'Maria', 'Carlos', 'Ana',
//     'Luis', 'Bruna', 'Felipe', 'Camila', 'Rafaela',
//     'Gustavo', 'Fernanda', 'Lucas', 'Patrícia', 'Ricardo',
//     'Beatriz', 'Gabriel', 'Larissa', 'Rafael', 'Juliana',
//     'Tiago', 'Mariana', 'Rodrigo', 'Renata', 'André',
//     'Daniela', 'Eduardo', 'Tatiana', 'Marcelo', 'Sofia',
//     'Diogo', 'Isabel', 'Paulo', 'Simone', 'Pedro',
//     'Carla', 'Leonardo', 'Alice', 'Flávio', 'Natália',
//     'César', 'Luana', 'Antônio', 'Vanessa', 'Roberto',
//     'Sandra', 'Fábio', 'Elisa', 'Henrique', 'Luciana'
// ];

export const Form = () => {
    const [isOpenModalNewTask, setIsOpenModalNewTask] = useState(false);
    const [isOpenModalDeleteTask, setIsOpenModalDeleteTask] = useState(false);
    const [task, setTask] = useState<string[]>([]);
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

    // Função para adicionar nova tarefa ao backend e atualizar o estado
    const addTaskOnState = async (newTask: string) => {
        if (task.includes(newTask)) {
            alert('Já existe essa tarefa!');
            return;
        }
        
        try {
            const taskData = {
                nameToDo: newTask,
                createAt: new Date(), // Define a data atual como criação
                finishedAt: new Date(), // Ajuste conforme necessário
            };

            const response = await axios.post('http://127.0.0.1:3000/api/toDo', taskData);
            setIsOpenModalNewTask(false);
            console.log('Tarefa cadastrada com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao cadastrar tarefa:', error);
        }

        // try {
        //   const response = await axios.post('/api/toDo', { nameToDo:  newTask });
        //   const { data } = response.data;

        //   setTask((prevState) => [...prevState, data.title]);
        //   setIsOpenModalNewTask(false);
        // } catch (error) {
        //   console.error('Erro ao cadastrar tarefa:', error);
        //   alert('Não foi possível cadastrar a tarefa.');
        // }
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/toDo'); // URL do seu backend
            const tasks = response.data;  // Supondo que a resposta seja uma lista de tarefas
            setTask(tasks.map((task: { nameToDo: string }) => task.nameToDo)); // Atualizando estado com nomes de tarefas
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

    const deleteTaskFromState = () => {
        if (taskToDelete) {
            setTask((prevState) => prevState.filter((t) => t !== taskToDelete));
            setCompletedTasks((prevState) => prevState.filter((t) => t !== taskToDelete));
            setIsOpenModalDeleteTask(false);
            setTaskToDelete(null);
        }
    };

    function OpenModalNewTask() {
        setIsOpenModalNewTask(true);
    }

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
                                binIcon={<Trash onClick={() => OpenModalDeleteTask(value)} className={style.icon} />}
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
