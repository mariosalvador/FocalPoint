// https://www.legaplan.com.br/#faq
import style from '@/app/styles/form.module.scss';

export const Form = () => {
    return (
        <section className={style.section}>
            <div className={style.div}>
                <h2>Suas tarefas de hoje</h2>

                <div className={style.dash}>
                    <div>
                        <span className={style.span}></span>
                        <label htmlFor="">Lavar as Mãos</label>
                    </div>

                    <div className={style.span}></div>
                </div>

                <h2>Tarefas Finalizadas</h2>

                <div>
                    <div>
                        <span></span>
                        <label htmlFor="">Lavar as Mãos</label>
                    </div>

                    <div></div>
                </div>

            </div>

            <button>Adicionar nova tarefa</button>
        </section>

    )

}