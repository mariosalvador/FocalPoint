import style from '@/app/styles/header.module.scss';
import { FormattedDate } from "@/app/lib/dayjs/formatDate";
import { Logo } from '@/public/logo';


export const Header = ()=>{
    return (
        <header className={style.header}>
            <div className={style.div}>
                <section>
                    <Logo/>
                </section>

                <h2>Bem-vindo de volta, Marcus</h2>
               <FormattedDate/>
            </div>
            
        </header>
    );
}
