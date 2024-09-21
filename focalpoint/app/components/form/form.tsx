// https://www.legaplan.com.br/#faq
import style from '@/app/styles/form.module.scss';
import { Dashed } from './dashed';


const tarefa = [
    {
        label: 'Lavar as maõs'
    },
    {
        label: 'Fazer bolo'
    },
    {
        label: 'Lavar a louça'
    }
]

export const Form = () => {
    return (
        <section className={style.section}>
            <div className={style.div}>
                <h2>Suas tarefas de hoje</h2>
                <section className={style.toDo}>
                    {
                        tarefa.map((value) => (
                            <Dashed key={value.label} label={value.label} />
                        ))
                    }
                </section>

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