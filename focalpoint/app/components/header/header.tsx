import logo from "@/public/focal-logo.png";
import Image from "next/image";
import style from '@/app/styles/header.module.scss';
import { FormattedDate } from "@/app/lib/dayjs/formatDate";




export const Header = ()=>{
    return (
        <header className={style.header}>
            <div className={style.div}>
                <section>
                    <Image src={logo}  alt="Logo FocalPoint" height={30} width={30}  />
                    FocalPoint
                </section>

                <h2>Bem-vindo de volta, Marcus</h2>
               <FormattedDate/>
            </div>
            
        </header>
    );
}
