import logo from "@/public/focal-logo.png";
import Image from "next/image";
import style from '@/app/styles/header.module.scss';




export const Header = ()=>{
    return (
        <header className={style.header}>
            <div className={style.div}>
                <section>
                    <Image src={logo}  alt="Logo FocalPoint" height={30} width={30}  />
                    FocalPoint
                </section>

                <h2>Bem-vindo de volta, Marcus</h2>
                <span>Segunda, 01 de dezembro de 2025</span>
            </div>
            
        </header>
    );
}
