import style from "@/app/styles/baseModal.module.scss";


interface ModalProps {
    tittleModal: string;
    titleTask?: string;
    askOnRemove?: string;
    // addTaskTitle?: string;
    // removeTaskTitle?: string;

    cancelButton?: () => void;
    addTask?: () => void;
    deleteTask?: () => void;

}
export const Modal = ({ tittleModal, addTask, askOnRemove, cancelButton, deleteTask, titleTask }: ModalProps) => {
    return (
        <section className={style.section}>
            <h2>{tittleModal}</h2>

            <div className={style.div}>
                {
                    titleTask ? (

                        <article className={style.art} >
                            <span>{titleTask}</span>
                            <input type="text" placeholder="Digite" />
                        </article>
                    ) : <span className={style.askOnRemov}>{askOnRemove}</span>
                }

                <article className={style.article2}>
                    <button className={style.button1} onClick={cancelButton} >Cancelar</button>
                    {
                        titleTask? (
                            <button className={style.button2} onClick={addTask}>Adicionar</button>
                        ) : (
                            <button className={style.button3} onClick={deleteTask}>Deletar</button>
                        )
                    }
                </article>
            </div>
        </section>
    );
}