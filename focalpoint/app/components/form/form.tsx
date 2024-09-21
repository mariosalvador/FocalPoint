"use client";
// https://www.legaplan.com.br/#faq

import style from '@/app/styles/form.module.scss';
import { Dashed } from './dashed';
import { Square, Trash } from 'lucide-react';
import { SquareCheck } from '@/public/Checkbox';
import { useEffect, useState } from 'react';
import { Modal } from '../modal/baseModal';



type taskprops = {
    label:string
}[]


const tarefas=[
    {
        label:'Lavar ',
    }, 
    {
        label:'Lavar ',
    }
]

export const Form = () => {
    const [isOpenModalNewTask,setIsOpenModalNewTask] = useState(false);
    const [isOpenModalDeleteTask,setIsOpenModalDeleteTask] = useState(false);
    const [task,setTask] = useState<taskprops>([]);
    // const [completedTask, setCompleteTask] = useState<[]>();

    // const checkedTask = ()=>{
          
    // }
    
    useEffect(()=>{
        setTask([...tarefas])
    },[tarefas]);

    function OpenModalNewTask(){
        setIsOpenModalNewTask(true);
        setIsOpenModalDeleteTask(false);
    }

    function OpenModalDeleteTask(){
        setIsOpenModalDeleteTask(true);
        setIsOpenModalNewTask(false);
    }
    
    function CloseModal(){
        setIsOpenModalDeleteTask(false);
        setIsOpenModalNewTask(false);
    }
 

    return (
        <section className={style.section}>
            <div className={style.div}>
                <h2>Suas tarefas de hoje</h2>
                <section className={style.toDo}>
                    {
                        task.map((value) => (
                            <Dashed key={value.label} label={value.label} squareIcon={<Square  className={style.icon}/>}  binIcon={<Trash onClick={OpenModalDeleteTask} className={style.icon}  />} />
                        ))
                    }
                </section>

                <h2>Tarefas Finalizadas</h2>

                
                <section className={style.toDo}>
                    {
                        task.map((value) => (
                            <Dashed key={value.label} label={value.label} squareCheckedIcon={<SquareCheck/>}  binIcon={<Trash onClick={OpenModalDeleteTask} className={style.icon}  />} />
                        ))
                    }
                </section>

            </div>

            <button className={style.button} onClick={OpenModalNewTask}>Adicionar nova tarefa</button>
                    {
                        isOpenModalNewTask? <Modal tittleModal='Nova tarefa' titleTask='Título' cancelButton={CloseModal} />  : ""
                    }
                    {
                        isOpenModalDeleteTask? <Modal tittleModal='Deletar tarefa' askOnRemove='Tem certeza que você deseja deletar essa tarefa?' cancelButton={CloseModal} />  : ""
                    }
                    
                    
                    
          
        </section>

    )

}