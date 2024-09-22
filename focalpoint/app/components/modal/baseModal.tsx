import style from "@/app/styles/baseModal.module.scss";
import { ChangeEvent, useState } from "react";

interface ModalProps {
    tittleModal: string;
    titleTask?: string;
    askOnRemove?: string;
    cancelButton?: () => void;
    addTask?: () => void;
    deleteTask?: () => void;
    getTask: (value: string) => void;
}

export const Modal = ({ tittleModal, askOnRemove, cancelButton, deleteTask, titleTask, getTask }: ModalProps) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleChange = (element: ChangeEvent<HTMLInputElement>) => {
        setInputValue(element.target.value);
    };

    const addTaskOnHandleChange = () => {
        if (inputValue.trim() !== "") {
            getTask(inputValue); 
            setInputValue("");
        } else {
            alert("Adicione alguma Tarefa!");
        }
    };

    return (
        <section className={style.section}>
            <h2>{tittleModal}</h2>

            <div className={style.div}>
                {titleTask ? (
                    <article className={style.art}>
                        <span>{titleTask}</span>
                        <input type="text" placeholder="Digite" maxLength={35} value={inputValue} onChange={handleChange} />
                    </article>
                ) : (
                    <span className={style.askOnRemov}>{askOnRemove}</span>
                )}

                <article className={style.article2}>
                    <button className={style.button1} onClick={cancelButton}>
                        Cancelar
                    </button>
                    {titleTask ? (
                        <button className={style.button2} onClick={addTaskOnHandleChange}>
                            Adicionar
                        </button>
                    ) : (
                        <button className={style.button3} onClick={deleteTask}>
                            Deletar
                        </button>
                    )}
                </article>
            </div>
        </section>
    );
};
